#!/bin/sh

docker build -f ui.Dockerfile -t img-projectm-ui-$1 .

docker run --name projectm-ui-$1 -p 8000:80 -it --detach img-projectm-ui-$1

docker exec -it projectm-ui-$1 sh
