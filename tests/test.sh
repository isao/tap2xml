#!/bin/sh -ex
cd $(dirname $0)

node ../index.js < ./fixture.tap > ./actual.json

diff ./expected.json ./actual.json
