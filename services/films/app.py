from flask import Flask, jsonify, request
from bson.objectid import ObjectId

import pymongo

app = Flask(__name__)

mongo = pymongo.MongoClient("mongodb://root:root@mongo:27017/film-app")
database = mongo["film-app"]
films = database["films"]


@app.errorhandler(405)
def handle405(e):
    return jsonify({
        'error': 'Method not allowed'
    }), 405


@app.route('/delete', methods=["DELETE"])
def delete():
    data = request.json

    id = data.get("_id")
    try:
        films.delete_one({'_id': ObjectId(id)})

        return jsonify({
            'message': 'Film delete successfully'
        })
    except NameError as err:
        return jsonify({
            'error': err
        }), 500


@app.route('/update', methods=["PUT"])
def update():
    data = request.json
    error = ""
    code = 500

    id = data.get("id")
    title = data.get("title")
    description = data.get("description")

    if not title:
        error = "Title cannot be empty"
        code = 422
    elif not description:
        error = "Description cannot be empty"
        code = 422
    elif not id:
        error = "Id cannot be empty"
        code = 422
    else:
        try:
            query = {
                "_id": ObjectId(id)
            }

            films.update_one(query, {
                "$set": {
                    'title': title,
                    'description': description
                }
            })

            return jsonify({
                'message': 'Film update successfully'
            })
        except pymongo.errors.PyMongoError as e:
            error = e

    return jsonify({
            'error': error
        }), code


@app.route('/insert', methods=["POST"])
def insert():
    data = request.json
    error = ""
    code = 500

    title = data.get("title")
    description = data.get("description")

    if not title:
        error = "Title cannot be empty"
        code = 422
    elif not description:
        error = "Description cannot be empty"
        code = 422
    else:
        try:
            films.insert_one({
                'title': title,
                'description': description
            })

            return jsonify({
                'message': 'Film insert successfully'
            })
        except pymongo.errors.PyMongoError as e:
            error = e

    return jsonify({
            'error': error
        }), code
    


@app.route('/', methods=["GET"])
def books():
    data = []
    cursor = films.find({})

    for document in cursor:
        document['_id'] = str(document['_id'])
        data.append(document)

    return jsonify({
        'data': data
    })


app.run(port=8000, debug=True, host='0.0.0.0')
