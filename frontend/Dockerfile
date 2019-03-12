# adapted from https://malcoded.com/posts/angular-docker

# stage 1: compile the angular app
FROM node:8.11.2-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk --no-cache add git && npm install
COPY . .
RUN npm run build

# Stage 2: serving the actual app
FROM nginx:1.13.12-alpine
COPY --from=node /usr/src/app/dist/mobile-wizard-frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
