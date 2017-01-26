

    const envr = require('../../');

    module.exports = {
          a: 1
        , b: 2
        , pass: envr.get('pass')
        , yeah: [{
            thisIs: {
                suchFun: envr.get('fancy')
            }
        }]
    };