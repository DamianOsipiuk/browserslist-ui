#!/usr/bin/env bash

browserslist=$(cut -d "@" -f2 <<<"$(npm list browserslist --depth=0 | grep browserslist@ | xargs)")
caniuse=$(cut -d "@" -f2 <<<"$(npm list caniuse-lite --depth=1 | grep caniuse-lite@ | xargs)")
echo "browserslist: $browserslist, caniuse: $caniuse"
echo "{\"browserslist\": \"$browserslist\",\"caniuse\": \"$caniuse\"}" > ./src/versions.json
