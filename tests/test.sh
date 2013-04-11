#!/bin/sh

cd $(dirname $0)

node .. < fixtures/sample.tap > actual.xml

cmp -s expected.xml actual.xml && echo pass
