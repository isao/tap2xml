/*
    parse tap test results line-by-line
*/

var rules = [
        {fn: 'counts',  re: /^# (tests|pass|fail) +(\d+)/},
        {fn: 'names',   re: /^# (.+)$/},
        {fn: 'results', re: /^(ok|not ok) (\d+) (.+)/},
        {fn: null,      re: /^\d+[.]{2}\d+$/ }, // i.e. 1..34 -> 34 tests
        {fn: null,      re: /TAP version \d+/ } // header
    ];


function Tap2js() {
    this.testname = ''; //tmp
    this.notmatch = []; //tmp
    this.cases = [];    //results
    this.tally = {};    //result summary
}

Tap2js.prototype.counts = function counts(m) {
    this.tally[m[1]] = +m[2];
};

Tap2js.prototype.names = function names(m) {
    this.testname = m[1];
};

Tap2js.prototype.results = function results(m) {
    var test = {
            name: this.testname,
            num: +m[2],
            pass: 'ok' === m[1],
            msg: m[3],
            body: null,
        };

    // save test result
    this.cases.push(test);

    // unmatched lines, if any, go with the last test's body
    if(this.notmatch.length > 1) {
        this.cases[this.cases.length - 2].body = this.notmatch.join('\n');
        this.notmatch = [];
    }
};

Tap2js.prototype.line = function(str) {
    var match;
    function perrule(rule) {
        match = str.match(rule.re);
        if(match) {
            if (rule.fn) {
                this[rule.fn](match);
            }
            return true;
        }
    }

    // match str against rules
    rules.some(perrule, this);

    // unmatched lines belong with previous testname
    if(!match) {
        this.notmatch.push(str);
    }
};

module.exports = Tap2js;
