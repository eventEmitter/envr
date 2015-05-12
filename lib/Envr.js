!function() {

	var   Class 		= require('ee-class')
        , argv          = require('ee-argv')
		, log 			= require('ee-log');


	module.exports = new Class({

		init: function(options) {
            if (argv.has('live') || argv.has('production') || argv.has('prod')) this.env = 'live';
            else if (argv.has('testing')) this.env = 'testing';
            else if (argv.has('staging')) this.env = 'staging';
            else this.env = 'dev';
		}
	});
}();
