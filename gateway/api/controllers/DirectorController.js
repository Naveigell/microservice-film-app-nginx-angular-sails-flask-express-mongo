const axios = require("axios");

/**
 * DirectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const url = "http://directors:3000";
const headers = { 
	'Content-Type': 'application/json'
};

module.exports = {
	getDirectors: function(request, response) {
		axios.get(`${url}/`).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	addDirectors: function(request, response) {
		const { name, born } = request.body;

		axios.post(`${url}/insert`, { name, born }, headers).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	deleteDirectors: function (request, response) {
		const { id } = request.body;

		axios.delete(`${url}/delete`, {
			data: { id }
		}).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	updateDirectors: function (request, response) {
		const { id, name, born } = request.body;

		axios.put(`${url}/update`, {
			id, name, born
		}).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	}
};

