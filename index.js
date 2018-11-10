'use strict';

/**
 * A wrapper of dotenv to support fallback in envfile.
 * @author Rej Mediodia
 */

const dotenv = require('dotenv');
const fs = require('fs');

class Env {
    constructor(config) {
        this.customEnv = {};
        // error is stored here.
        this.error;

        try {
            let envFile = fs.readFileSync(config.path, config.encoding);
            // all environment will be specified in the customEnv Object
            this.customEnv = dotenv.parse(envFile);
        } catch(e) {
            this.error = e;
        };
    }
    
    /**
     * Get the key from the environment.
     * @param {string} key - name of the key to be access  
     * @param {string} defaultValue - the default value to be returned if there is no specified key in the environment
     * 
     * @return {string}
     * 
     * @example 
     * ```
     * Env.get('HOST', 'localhost')
     * ```
     */ 
    get(key, defaultValue, original) {
        let additionalEnv;
        
        // if original is true ignored checking in customEnv
        if(!original) additionalEnv = this.customEnv[key];

        return additionalEnv || process.env[key] || defaultValue;
    }

    /**
     * Parse the value from key of the environment to object.
     * @param {string} key - name of the key to be access  
     * @param {any} defaultValue - the default value to be returned if there is no specified key in the environment
     * 
     * @return {object}
     * 
     * @example 
     * ```
     * Env.get('REDIS_HOST', '[{'host'=>'localhost'}, {'host','localhost'}]')
     * ```
     */
    getAndParse(key, defaultValue) {
        let value = this.get(key);
        // if there is value parse it else show the default value.
        return (value) ? JSON.parse(value) : defaultValue;
    }

    /**
     * Set or override the key to be use as environment.
     * @param {string} key - key to  
     * @param {any} value 
     * 
     * @example 
     * ```
     * Env.set('DB_HOST', object)
     * ```
     */
    set(key, value) {
        this.customEnv[key] = value;
    }
}

module.exports = Env;