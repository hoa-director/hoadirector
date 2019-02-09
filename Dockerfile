ARG SOURCE_PATH=/home/node/app

# Build out the application
FROM node:10 as builder

ARG SOURCE_PATH

RUN mkdir -p ${SOURCE_PATH} chmod node:node ${SOURCE_PATH}

WORKDIR ${SOURCE_PATH}

COPY package*.json ./

COPY --chown=node:node . .

RUN npm install

COPY . .

RUN npm run build

USER node

# Install the production dependincies in a seperate instance to be imported
FROM node:10 as build-prod-deps

ARG SOURCE_PATH

RUN mkdir -p ${SOURCE_PATH} 777 ${SOURCE_PATH}

WORKDIR ${SOURCE_PATH}

COPY package*.json ./

RUN npm install --only=production

# This is the final instance that will be used to run our server
FROM node:10-alpine as release

ARG SOURCE_PATH

RUN mkdir -p ${SOURCE_PATH} && chmod 777 ${SOURCE_PATH}

WORKDIR ${SOURCE_PATH}

RUN ls

COPY package.json ./

COPY --from=builder ${SOURCE_PATH}/dist ./dist

RUN ls

COPY --from=build-prod-deps ${SOURCE_PATH}/node_modules ./node_modules

RUN ls

EXPOSE 3000

CMD [ "npm", "start" ]
