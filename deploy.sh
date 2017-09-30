#!/bin/bash
npm install
#ng build --prod --build-optimizer
ng build
#ng run build:prod:aot --build-optimizer
docker build -t connecta-client .
docker run -d -p 8080:80 connecta-client
