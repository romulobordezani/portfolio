#!/usr/bin/env bash

# print outputs and exit on first failure
set -x

if [ $TRAVIS_BRANCH == "master" ] ; then

    # setup ssh agent, git config and remote
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/digitalocean
    git remote add deploy "travis@romulobordezani.com.br:/var/www/romulobordezani.com.br"
    git config user.name "travis"
    git config user.email "romulobordezani@gmail.com"

    # commit compressed files and push it to remote
    git add .
    git status # debug
    git commit -m "Deploy compressed files"
    git push -f deploy HEAD:master

else

    echo "No deploy script for branch '$TRAVIS_BRANCH'"

fi
