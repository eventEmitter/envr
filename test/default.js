	
	
	// push the env since mocha is stupid and doesnt acccept unknown args
	process.argv.push('--testing');

	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, assert 		= require('assert');


	var envr = require('../')



	describe('ENVR', function(){
		it('should get the coirrect env', function(){
			assert(envr.env, 'testing')
		});		
	});
	