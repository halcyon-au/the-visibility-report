FROM node:16-alpine

COPY . /app/
WORKDIR /app

RUN apk add --no-cache git python3 make g++
RUN npm install