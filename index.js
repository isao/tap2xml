#!/usr/bin/env node
/*
    parse tap test results from stdin, emit junit/xunit-like xml on stdout
*/
var parser = require('./tap-parse'),
    xmlout = require('./xml-out'),
    buffer = '';


function xmlify(err, results) {
    console.log(JSON.stringify(results, null, 2));
}

function parse() {
    parser(buffer.split('\n'), xmlify);
}

function ondata(chunk) {
    buffer += chunk;
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', ondata);
process.stdin.on('end', parse);
