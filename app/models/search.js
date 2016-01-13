var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Search = new Schema({
    term: {type: String, required: true},
    when: {type: Date, default: Date.now}
});

//create URL model
module.exports = mongoose.model('Search', Search);
