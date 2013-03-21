var fs = require('fs'),
    hb = require('handlebars');


function main(data) {
    var tmpl = __dirname + '/template.xml',
        hbjs = hb.compile(fs.readFileSync(tmpl, 'utf-8'));

    //fs.writeFileSync(__dirname + '/tests/results.xml', hbjs(data));
    return hbjs(data);
}

module.exports = main;
