var read = require('fs').readFileSync,
    hb = require('handlebars');


function main(data, template) {
    var hbjs = hb.compile(read(template, 'utf-8'));
    return hbjs(data);
}

module.exports = main;
