## STAGE 1: Build the applicaiton dist folder in an instance
FROM node:12 as builder

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

RUN npm run build

## STAGE 2: Serve the files from builder
FROM nginx

COPY --from=builder /app/dist/* usr/share/nginx/html/

# Expose the port the app runs in
EXPOSE 80

## Stage 3: Install production dependincies in a seperate instance
FROM node:12 as build-prod-deps

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install only production dependencies 
RUN npm install --only=production

## Stage 4: Build App Server
# This is the final instance that will be used to run the App server
FROM node:12-alpine as release

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

RUN ls

# Copy dependency definitions
COPY package.json /app

COPY --from=builder /app/dist/* ./dist/

RUN ls

COPY --from=build-prod-deps /app/node_modules ./node_modules/

RUN ls

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
