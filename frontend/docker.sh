#!/bin/sh
docker run \
    --name test2 \
    --rm \
    -d \
    -p 3000:80 \
    test2
