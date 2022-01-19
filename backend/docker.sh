#!/bin/sh
docker run \
    --mount type=bind,source="$(pwd)"/database,target=/app/database \
    --name test \
    --rm \
    -d \
    -p 4000:80 \
    test

