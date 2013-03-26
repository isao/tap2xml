#!/bin/sh -ex
cd $(dirname $0)

node ../ < fixtures/sample.tap > expected.xml

diff ./expected.xml ./actual.xml
