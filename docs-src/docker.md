# Docker for Kakunin tests

This section will walk through how to build your own docker image for your tests.

## Dockerfile
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
# Removing node_modules in case of existance or lack of .dockerignore and installing from package.json
RUN rm -rf ./node_modules \
    && npm install
```
