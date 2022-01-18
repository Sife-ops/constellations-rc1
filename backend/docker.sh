docker run \
    --name test \
    --rm \
    -p 4000:80 \
    --mount type=bind,source="$(pwd)"/database,target=/app/database \
    test

