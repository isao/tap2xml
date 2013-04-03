#!/bin/sh -ex
cd $(dirname $0)

node ../ < fixtures/sample.tap > actual.xml

diff ./expected.xml ./actual.xml
