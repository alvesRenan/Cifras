var mongoose = require('mongoose');

module.exports = function() {

	var schema = mongoose.Schema({
	    nome: { 
	      type: String, 
	      required: true
	    }, 
	    artista: {
	    	type: String,
	    	required: true
	    },
	    cifra: {
	    	type: String,
	    	required: true
	    },
	    user: {
	    	type: String,
	    	required: true
	    }
	}); 
	
	return mongoose.model('Cifras', schema);

};
