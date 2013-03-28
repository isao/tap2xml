var read = require('fs').readFileSync,
    hb = require('handlebars');


function main(data) {
    var tmpl = __dirname + '/template.xml',
        hbjs = hb.compile(read(tmpl, 'utf-8'));

    return hbjs(data);
}

module.exports = main;
