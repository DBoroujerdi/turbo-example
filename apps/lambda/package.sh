#!/bin/bash

echo "Packaging Lambda..."

START_DIR=$(pwd)

cd ../../

yarn turbo prune --scope=lambda --docker

cd out

mkdir temp

cp full/apps/lambda/package.json temp
cp -R full/apps/lambda/dist temp
cp -R json/* temp
cp yarn.lock temp

cd temp

yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts

zip -r "$START_DIR/lambda.zip" node_modules dist

rm -rf temp

cd $START_DIR
