const config = {
    path: __dirname + '/../.env'
};

const Env = new (require('../index'))(config);
// const EnvJS = require('../index');
// const Env = new EnvJS(config);

console.log(Env.get('HOST', 'SampleHost'));
console.log(Env.get('PORT2', 'AnotherPort'));
Env.set('HOST1', 'Test - - - ');
console.log(Env.get('HOST1', 'AnotherHost'));

console.log(Env.getAndParse('HOST2', 'Test'));



 