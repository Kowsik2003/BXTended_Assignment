const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true,'provide name field']
	},
	imageUrl : {
		type : String,
		default : ''
	},
	Author : {
		type : String,
		required : [true,'provide Author field']
	},
	pages : {
		type : Number,
		required : [true,'provide pages field']
	},
	price : {
		type : Number,
		required : [true,'provide price field']
	}
});

module.exports = mongoose.model('book',bookSchema);