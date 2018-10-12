# Kakunin e2e tests docker


## Installation

To install tests download this repo and prepare docker with
command `docker-compose build`. Then install npm inside image
`docker-compose run e2e bash` and then run `make install`.

Copy `.env.dist` to `.env` and provide correct data.

## Run tests manually

```bash
docker-compose run --rm e2e
```

## Run via cron

Edit cron `crontab -e`. Remember to always use full paths.

```crontab
25 4 * * * cd /path/to/e2e && /usr/local/bin/docker-compose run --rm e2e
```

Or if you use custom script as proxy

```crontab
25 4 * * * /path/to/e2e-script.sh
```

```bash
#!/usr/bin/env bash

cd /path/to/e2e
/usr/local/bin/docker-compose run --rm e2e
```

## Notes
This makefile and docker-compose are only example of how you can use docker image, also 
we added you example use with cronetab and manual test runner via console/terminal.
