#!/usr/bin/env node
/*
    parse tap test results from stdin, emit junit/xunit-like xml on stdout
*/
var resolve = require('path').resolve,
    split = require('split'),
    Tap2js = require('./parse-tap'),
    xmlify = require('./render-xml'),

    parse = new Tap2js();


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin
    .pipe(split())
    .on('data', parse.line.bind(parse));

process.stdin.on('end', function() {
    var data = parse.tally;
    data.cases = parse.cases;

    process.stdout.write(xmlify(data, resolve(__dirname, 'xunit.tmpl.xml')));
});
