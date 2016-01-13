var Search = require('../models/search.js');
var request = require('request');
var randomstring = require("randomstring");

function SearchHandler () {
	var apiKey = process.env.GOOGLE_API;
	var cx = process.env.GOOGLE_SEARCH_ID;

	this.searchImage = function(req, res) {
	 	var searchQuery = req.params.searchQuery;
 		var searchResult = [];
 		
	    var searchUrl = "https://www.googleapis.com/customsearch/v1?searchType=image&key="
	      + apiKey + "&cx=" + cx + "&q=" + searchQuery;
 
	    // check if the 'offset' query param is there and is a positive number
	    if (req.query.offset) {
	      var offset = parseInt(req.query.offset, 10);
	      if (offset && offset > 0) {
	        searchUrl += ('&start=' + offset);
	      }
	    }
		
	     
	    request(searchUrl, {json: true}, function(error, result, data) {
	      if (error || data.items === undefined) { 
	        res.json('Sorry, no image result for ' + searchQuery + " in our database.");
	      } else { 
	 
	      	// map google returned data to the required output format 
	        searchResult = data.items.map(function(item){
	          return {
	            'url' : item.link,
	            'snippet' : item.snippet ,
	            'thumbnail' : item.image.thumbnailLink,
	            'context' : item.image.contextLink
	          }
	        });
	        
	        		  
	        // create a new search item and store it in the db
	        var search = new Search ({'term': searchQuery});
	        search.save(function (err) {
	          if (err) {
	            return res.json(err)
	          }
	          res.json(searchResult);
	        })
	      }	
	      
	    });
	    
	      
	};
	
	this.getLatestSearches = function(req, res){
		var searchResult = [];
 		Search.find().sort({_id:-1}).limit(10).exec(function(err, data){
			if(err) return err;
			var data
			searchResult = data.map(function(item){
				return {
					'term' :item.term,
					'when' : item.when
				}
			});		
			
			res.json(searchResult);
		});
	}
 
}

module.exports = SearchHandler;
