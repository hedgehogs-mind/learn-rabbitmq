#!/bin/sh
docker run \
  --hostname learn-rabbitmq \
  --name docker-rabbitmq \
  -e RABBITMQ_DEFAULT_USER=peter \
  -e RABBITMQ_DEFAULT_PASS=bananasAreAwesome \
  --rm \
  -p 5672:5672 \
  rabbitmq:3