const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://root:root@mongo:27017/film-app";
let database, directors;

mongo.connect(url, {useUnifiedTopology: true,}, function(err, db) {
	if (err) {
		throw err;
	}

	database = db.db("film-app");
	directors = database.collection('directors');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete("/delete", async function(request, response) {
	const data = request.body;
	const id = data.id;

	try {
		const query = {
			"_id": ObjectId(id)
		};

		directors.deleteOne(query);

		return response.json({
			message: "Delete directors successfully",
		})
	} catch (error) {
		response.status(500).json({error});
	}
});

app.put("/update", async function(request, response) {
	const data = request.body;
	const name = data.name, born = data.born;
	const id = data.id;

	let error = "", code = 500;

	if (name === "" || name === undefined || name === null) {
		error = "Name cannot be empty";
		code = 422;
	} else if (born === "" || born === undefined || born === null) {
		error = "Born cannot be empty";
		code = 422;
	} else if (id === "" || id === undefined || id === null) {
		error = "Id cannot be empty";
		code = 422;
	} else {
		try {
			const query = {
				"_id": ObjectId(id)
			};

			directors.updateOne(query, {
				$set: {
					name, born
				}
			});

			return response.json({
				message: "Update directors successfully",
			});
		} catch (error) {
			error = error;
			code = 500;
		}
	}

	response.status(code).json({error});
});

app.post("/insert", async function(request, response) {
	const data = request.body;
	const name = data.name, born = data.born;
	let error = "", code = 500;

	console.log(name, born);

	if (name === "" || name === undefined || name === null) {
		error = "Name cannot be empty";
		code = 422;
	} else if (born === "" || born === undefined || born === null) {
		error = "Born cannot be empty";
		code = 422;
	} else {
		try {
			directors.insertOne({
				name, born
			});

			response.json({
				message: "Insert directors successfully",
			});
			return;
		} catch (error) {
			error = error;
			code = 500;
		}
	}

	response.status(code).json({error});
})

app.get("/", async function(request, response) {
	const data = await directors.find({}).toArray().then(result => {
		return result;
	});

	response.json({
		data
	});
});

app.listen(3000, '0.0.0.0', function() {
	console.log("App running on port 3000");
})