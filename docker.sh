#!/bin/sh

#export REACT_APP_NGROK="http://e167-162-226-145-251.ngrok.io"

pushd ./frontend
npm run build
popd
docker-compose up --build
