#!/usr/bin/env node
/*
 * Copyright (c) 2013 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

/*
    parse tap test results from stdin, emit junit/xunit-like xml on stdout
*/

var hbtpl = require('path').resolve(__dirname, 'xunit.hb.xml'),
    split = require('split'),
    xmlify = require('./render-xml'),
    Tap2js = require('./parse-tap'),
    parse = new Tap2js();


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin
    .pipe(split())
    .on('data', parse.line.bind(parse));

process.stdin.on('end', function() {
    process.stdout.write(xmlify(parse.data, hbtpl));
});
