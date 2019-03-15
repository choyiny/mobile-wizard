FROM node:8.11.2-alpine as node
RUN apk --no-cache add git && npm install -g peer
ENTRYPOINT peerjs --port 9000 --key ${SECRET_KEY}
