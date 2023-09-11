const peopleModule = module.require('./people.js');

console.log(peopleModule)

const os = module.require('os')
//console.log(os)
console.log(os.cpus())
console.log(os.freemem())
console.log(os.homedir())
console.log(os.type())