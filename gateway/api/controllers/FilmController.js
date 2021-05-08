const axios = require("axios");

/**
 * FilmController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const url = "http://films:2000";
const headers = { 
	'Content-Type': 'application/json'
};

module.exports = {
	getFilms: function(request, response) {
		axios.get(`${url}`).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	addFilms: function(request, response) {
		const { title, description } = request.body;

		axios.post(`${url}/insert`, { title, description }).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	deleteFilms: function (request, response) {
		const { id } = request.body;

		axios.delete(`${url}/delete`, {
			data: { _id: id }
		}).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	},
	updateFilms: function (request, response) {
		const { id, title, description } = request.body;

		axios.put(`${url}/update`, {
			id, title, description
		}).then((res) => {
			response.json(res.data);
		}).catch((error) => {
			response.json(error.response.data);
		});
	}
};

