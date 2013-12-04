#!/bin/bash -x

# stop if we have some error
set -e

WORKSPACE=`pwd`
DEPENDENCIES="${WORKSPACE}/dependencies"
REPOSITORY=/local/repository/todo.rappidjs.com
BRANCH=${GIT_BRANCH};

if [ -z BRANCH ]; then
    # branch not set from jenkins, get it from the git commandline
    BRANCH=`git status | grep "On branch" | cut -d' '  -f 4`
fi

rm -rf public public-build server
git reset --hard HEAD
git pull origin dev;

npm install

cd ${WORKSPACE}

RAPPIDJS="node_modules/rAppid.js/bin/rappidjs"
chmod +x ${RAPPIDJS}

${RAPPIDJS} init;

VERSION="`$RAPPIDJS version`-$BUILD_NUMBER";
REPO=${REPOSITORY}/${VERSION};

echo "VERSION: $VERSION"

${RAPPIDJS} build --version ${VERSION}

cd public-build/
cp index.html ${VERSION}/

mkdir -p ${REPO};
tar -czf ${REPO}/client.tar.gz index.html ${VERSION}

rm -f ${REPOSITORY}/latest
ln -s ${REPO} ${REPOSITORY}/latest

echo ${VERSION} > /local/version/todo.rappidjs.com.version

if [ $USER == "jenkins" ]; then
    sudo /local/www/todo.rappidjs.com/bin/update beta ${VERSION}
fi
