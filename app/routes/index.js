'use strict';
var path = process.cwd();
var SearchHandler = require(path + '/app/controllers/searchHandler.server.js');

module.exports = function (app) {
	var searchHandler = new SearchHandler();
	app.get('/', function (req, res) {
  		res.sendFile(path + '/public/index.html');
	});
	app.get('/imagesearch/:searchQuery', searchHandler.searchImage);
	app.get('/latest/imagesearch', searchHandler.getLatestSearches);
};
