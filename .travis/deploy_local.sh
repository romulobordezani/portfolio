#!/usr/bin/env bash

# print outputs and exit on first failure
set -x

# setup ssh agent, git config and remote
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/travis_rsa
git remote add deploy "travis@romulobordezani.com.br:/var/www/romulobordezani.com.br"
git config user.name "travis"
git config user.email "romulobordezani@gmail.com"

# commit compressed files and push it to remote

cp .gitignore .gitignore_bkp
rm -f .gitignore
cp .travis/deployignore .gitignore
git add .
git status # debug
git commit -m "Deploy compressed files"
git push -f deploy HEAD:master

rm -f .gitignore
cp .gitignore_bkp .gitignore
rm -f .gitignore_bkp
