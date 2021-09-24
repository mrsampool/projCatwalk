#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
npx forever stopall
git pull origin release
git switch release
npm i
npx forever start server
