/* eslint-disable import/no-anonymous-default-export */

const fork = require('child_process').fork;
const path = require('path');

const program = path.resolve('child.js');
console.log(program);
const parameters = [];
const options = {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc']
};

const child = fork(program, parameters, options);

child.on('message', message => {
  console.log('message from child:', message);
  child.send('Hi');
});