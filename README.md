# RESM-Env
A wrap service of dotenv utilizing fallback for non existing environment configuration in Nodejs

## Prerequisite
- [dotenv](https://github.com/motdotla/dotenv) 

## Installation 
`npm install --save resm-env`

## Usage

Available methods:
- `get(key, defaultValue)` - get the specific env key and specify the default value if not existing.
- `set(key, value)` - specify additional environment and value.
- `getAndParse(key, defaultValue)` - get the specific env key and parse it to get the object. If the value is not a `string object`, please use the `get` method instead.

```
const config = {
    // full path
    path: __dirname + '/.env',
    //optional
    encoding: 'UTF8' //default UTF8
};

const Env = new (require('resm-env'))(config);

Env.get('HOST', 'SampleHost');

const data = [
    {HOST: 'localhost', PORT: 9000}
    {HOST: '127.0.0.1', PORT: 9001}
];
Env.set('HOST_REPLICA', data);

Env.get('HOST_REPLICA', data);

Env.getAndParse('REDIS_REPLICA', `[
    {HOST: 'localhost', PORT: 9000}
    {HOST: '127.0.0.1', PORT: 9001}
]`);
```

## Inspiration.
- [Laravel Env](https://laravel.com/docs/5.6/helpers#method-env) 
- [Adonis Env](https://adonisjs.com/docs/4.0/configuration-and-env#_environment_variables)

## License 
MIT
