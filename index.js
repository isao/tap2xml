#!/usr/bin/env node
/*
    parse tap test results from stdin, emit junit/xunit-like xml on stdout
*/
var parser = require('./tap-parse'),
    xmlify = require('./xml-out'),
    buffer = '';


function parse() {
    parser(buffer.split('\n'), function(err, data) {
    	process.stdout.write(xmlify(data));
    });
}

function ondata(chunk) {
    buffer += chunk;
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', ondata);
process.stdin.on('end', parse);
