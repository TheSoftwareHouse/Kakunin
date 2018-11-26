---
id: docker
title: Docker
---

# Docker for Kakunin tests

This section explains how to run kakunin tests inside docker, below examples of Dockerfile
and docker-compose.yml files let you build your first docker image and run tests.

## Dockerfile:

This file is responsible for building the whole environment for our e2e tests.
It will allow you to run tests on local and CI environments, 
by configuring and copying the whole project inside the container.
Just simply place it inside your e2e project root.

Below an example of Dockerfile

### Example of Dockerfile:
```bash
# Downloading selenium image and setting privileges
FROM selenium/standalone-chrome:3.14.0
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
# Copy tests directory with ignored files from .dockerignore
COPY --chown=seluser:seluser . .
# Removing node_modules in case of existence or lack of .dockerignore and installing from package.json
RUN rm -rf ./node_modules \
    && npm install
# Setting Xvfb
RUN export DISPLAY=:99.0
USER seluser
```

##docker-compose.yml

Compose is a tool for defining and running multi-container Docker applications, which we use
for running our tests.

Running command: ``docker-compose up -d`` will start Dockerfile script, as a result, it builds the container.
 
Running command: ``docker-compose build `` or ``docker-compose up --build`` will 
rebuild container, if there were made any changes.
 
Running command: ``docker-compose run --rm e2e`` will start running tests inside the container


Composition below allows you to run e2e tests inside the container and configure it locally or
in CI environments.


### Example of docker-compose.yml:
```bash
e2e:
      build: .
      working_dir: /app
      command: sh -c "Xvfb -ac :99 -screen 0 1280x1024x16 & npm run kakunin"
```

### How to run step by step
1. Install docker (e.g Docker for Mac),
2. Create Dockerfile and docker-compose.yml in the root of your e2e project,
3. Run in command line `docker-compose up -d ` which will start docker and build image
 if it's not build
4. Run in command line `docker-compose run --rm e2e` to run your tests

