#!/usr/bin/env node

var tallymap = {tests: 'total', pass: 'passed', fail: 'failed'},
    dispatch = [
        {fn: counts,  re: /^# (tests|pass|fail) +(\d+)/},
        {fn: names,   re: /^# (.+)$/},
        {fn: results, re: /^(ok|not ok) (\d+) (.+)/},
        {fn: noop,    re: /^\d+[.]{2}\d+$/ }, // i.e. 1..34 for 34 tests expected
        {fn: noop,    re: /TAP version \d+/ } // header
    ],

    buffer = '',
    testname = '',

    tests = [],
    tally = {};


function noop() {
}

function counts(m) {
    var type = tallymap[m[1]];
    tally[type] = m[2];
}

function names(m) {
    testname = m[1];
}

function results(m) {
    var test = {
        testname: testname,
        testnum: m[2],
        duration: 1,
        result: 'ok' === m[1] ? 'pass' : 'fail',
        message: m[3] + '\n'
    };
    tests.push(test);
}

function parseTap(lines) {
    var notmatch = [];

    function perline(line) {
        var match;
        function perrule(rule) {
            if(match = line.match(rule.re)) {
                if(tests.length && notmatch.length) {
                    //unmatched lines belong in test message
                    tests[tests.length - 1].message += notmatch.join('\n');
                    notmatch = [];
                }
                rule.fn(match);
                return true;
            }
        }
        dispatch.some(perrule, this);
        if(!match) notmatch.push(line);
    }

    lines.forEach(perline);
}

function finish() {
    parseTap(buffer.split('\n'));
    console.log(JSON.stringify({
        tally: tally,
        tests: tests
    }, null, 2));
}

function ondata(chunk) {
    buffer += chunk;
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', ondata);
process.stdin.on('end', finish);
