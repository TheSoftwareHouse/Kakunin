# Docker for Kakunin tests

This section will walk you through building your own docker image for your tests.

## Dockerfile:

This file is responsible for building whole environment for our e2e tests.
It will allow you to run tests on local and CI environments, 
by configuring and coping whole project inside container.

To clarify what's happening Dockerfile example contains comments describing whole process.

### Example:
```bash
# Downloading selenium image and setting privileges
FROM selenium/standalone-chrome:latest
USER root
# Setting test directory
WORKDIR /app
# Install openjdk-8-jdk-headless
RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install \
    xvfb \
    openjdk-8-jdk-headless \
    curl \
    make \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
# Installing node 8 globally and setting paths
RUN set -x \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y \
        nodejs \
    && npm install -g npm@latest
RUN PATH=/usr/bin/node:$PATH
# Setting Xvfb
RUN export DISPLAY=:99.0
RUN Xvfb -ac $DISPLAY &
# Copy tests directory with ignored files from .dockerignore
COPY . .
# Removing node_modules in case of existence or lack of .dockerignore and installing from package.json
RUN rm -rf ./node_modules \
    && npm install
```

## docker-compose.yml

Compose is a tool for defining and running multi-container Docker applications, which we use
for running our tests.

Running command: ``docker-compose up -d`` will start Dockerfile script as a result it builds container.
 
Running command: ``docker-compose build `` or ``docker-compose up --build`` will 
rebuild container, if there were made any changes.
 
Running command: ``docker-compose run --rm e2e`` will start running tests inside container


Composition below allows you to run e2e tests inside container and configure it locally or
on CI environments.


### Example:
```bash
e2e:
      build: .
      working_dir: /app
      command: sh -c "npm run kakunin"
```

## Configuration examples:

### Cron

Edit cron crontab -e. Remember to always use full paths.

``25 4 * * * cd /path/to/e2e && /usr/local/bin/docker-compose run --rm e2e``
Or if you use custom script as proxy

Command to run script
```
25 4 * * * /path/to/e2e-script.sh
```
Bash script:
```bash
#!/usr/bin/env bash

cd /path/to/e2e
/usr/local/bin/docker-compose run --rm e2e
```
