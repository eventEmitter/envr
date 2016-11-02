(function() {
    'use strict';

    const path  = require('path');
    const fs    = require('fs');


    const has   = (...keys) => keys.some(key => process.argv.includes(`--${key}`));
    const is    = (...keys) => keys.some(key => key === process.env.NODE_ENV);


    // get from cli
    let env = has('live', 'prod', 'production') ? 'production' : (
        has('staging', 'integration') ? 'integration' : (
            has('testing') ? 'testing' : (
                has('dev', 'develop', 'development') ? 'development' : null)));



    // get from env
    if (!env) {
        env = is('live', 'prod', 'production') ? 'production' : (
            is('staging', 'integration') ? 'integration' : (
                is('testing') ? 'testing' : (
                    is('dev', 'develop', 'development') ? 'development' : '[not set]')));
    }




    // export
    module.exports = {

        // export env string
        get env() {
            return env;
        }




        , isProduction() {
            if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
            return env === 'production';
        }

        , isIntegration() {
            if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
            return env === 'integration';
        }

        , isTesting() {
            if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
            return env === 'testing';
        }

        , isDevelopment() {
            if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
            return env === 'development';
        }




        // load env dependent config
        , config(__dirname) {
            if (env === '[not set]') throw new Error(`Canont get config file: the environment was not set!`);

            const envPath       = path.join(__dirname, `config.${env}.js`);
            const defaultPath   = path.join(__dirname, 'config.js');

            let envStats, stats, envConfig, config;


            // get the environment dependent version
            try {
                envStats = fs.statSync(envPath);
            } catch (err) {
                throw new Error(`Failed to stat configfile ${envPath}. Does the file exists?`);
            }

            if (!envStats.isFile()) throw new Error(`Cannot load configfile ${envPath}. Is it a file?`);

            try {
                envConfig = require(envPath);
            } catch (err) {
                console.log(`Failed to load configfile ${envPath}:`);
                throw err;
            };


            // get the default version
            try {
                stats = fs.statSync(defaultPath);
            } catch (err) {
                // this file is optional
            }

            if (stats) {
                if (!stats.isFile()) throw new Error(`Cannot load configfile ${defaultPath}. Is it a file?`);

                try {
                    config = require(defaultPath);
                } catch (err) {
                    console.log(`Failed to load configfile ${defaultPath}:`);
                    throw err;
                };
            }


            // merge
            if (config) return Object.assign(envConfig, config);
            else return envConfig;
        }
    }
})();
