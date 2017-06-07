#!/usr/bin/env bash

# print outputs and exit on first failure
set -xe

if [ $TRAVIS_BRANCH == "master" ] ; then

    # setup ssh agent, git config and remote
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/travis_rsa
    git remote add deploy "travis@romulobordezani.com.br:/var/www/romulobordezani.com.br"
    git config user.name "travis"
    git config user.email "romulobordezani@gmail.com"

    rm -f .gitignore
    cp .travis/deployignore .gitignore
    git add .
    git status # debug
    git commit -m "On the way to Digital Ocean."
    git push -f deploy HEAD:master

else

    echo "No deploy script for branch '$TRAVIS_BRANCH'"

fi
