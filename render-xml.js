/*
 * Copyright (c) 2013 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

var read = require('fs').readFileSync,
    hb = require('handlebars');


function main(data, template) {
    var hbjs = hb.compile(read(template, 'utf-8'));
    return hbjs(data);
}

module.exports = main;
