/*
    parse tap test results into an object
*/
var tallymap = {
        tests: 'total',
        pass: 'passed',
        fail: 'failed'
    },
    lineproc = [
        {fn: counts,  re: /^# (tests|pass|fail) +(\d+)/},
        {fn: names,   re: /^# (.+)$/},
        {fn: results, re: /^(ok|not ok) (\d+) (.+)/},
        {fn: noop,    re: /^\d+[.]{2}\d+$/ }, // i.e. 1..34 -> 34 tests expected
        {fn: noop,    re: /TAP version \d+/ } // header
    ],
    testname,
    tests,
    tally;


function noop() {
}

function counts(m) {
    var type = tallymap[m[1]];
    tally[type] = +m[2];
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

function parse(line) {
    var match,
        notmatch = [];

    function perrule(rule) {
        if(match = line.match(rule.re)) {
            if(tests.length && notmatch.length) {
                //unmatched lines belong with previous test message
                tests[tests.length - 1].message += notmatch.join('\n');
                notmatch = [];
            }
            rule.fn(match);
            return true;
        }
    }

    lineproc.some(perrule, this);
    if(!match) {
        notmatch.push(line);
    }
}

function main(lines, cb) {
    testname = '';
    tests = [];
    tally = {};

    lines.forEach(parse);

    if(!tally.hasOwnProperty('fail')) {
        tally.failed = 0;
    }
    cb(null, {tally:tally, tests:tests});
}

module.exports = main;
