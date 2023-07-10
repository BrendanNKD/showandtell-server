# showandtell-server

[![Python](https://img.shields.io/badge/python-2.7%2C%203.5%2C%203.6--dev-blue.svg)]()
[![Docker](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg?maxAge=2592000)]()



# flask-app

Example app for demonstrating continuos integration/continuos deployment (CI/CD) workflows -- inspired by [dockercloud-quickstart-python](https://github.com/docker/dockercloud-quickstart-python).

The example flask app connects to a [redis](http://redis.io/) instance and displays a simple visit counter and the hostname of the docker container serving the app.

## Getting started

Install [docker](https://docs.docker.com/engine/installation/) and run:

```shell
docker-compose up
# docker-compose stop
```

Otherwise, for the standalone web service:

```shell
pip install -r requirements.txt
python app.py
```

Visit [http://localhost:5000](http://localhost:5000)

## Development

Create a new branch off the **develop** branch for features or fixes.

After making changes rebuild images and run the app:

```shell
docker-compose build
docker-compose run -p 5000:5000 web python app.py
# docker stop flaskapp_redis_1
```

## Tests

Standalone unit tests run with:

```shell
pip install pytest pytest-cov pytest-flask
pytest --cov=web/ --ignore=tests/integration tests
```

Integration and unit tests run with:

```shell
docker-compose -f test.yml -p ci build
docker-compose -f test.yml -p ci run test python -m pytest --cov=web/ tests
# docker stop ci_redis_1 ci_web_1
```

After testing, submit a pull request to merge changes with **develop**.

## Notifications

Updates and alerts pushed via Slack:

- github
