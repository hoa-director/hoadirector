## STAGE 1:
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

## STAGE 2:
FROM nginx

COPY --from=builder /app/dist/* usr/share/nginx/html/

# Expose the port the app runs in
EXPOSE 80