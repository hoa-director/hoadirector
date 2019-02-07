FROM node:10-alpine

RUN apk add --no-cache \
  git \
  python \
  build-base

RUN mkdir -p /home/node/app && chmod 777 /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
