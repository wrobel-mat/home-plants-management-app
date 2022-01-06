# syntax=docker/dockerfile:1

FROM node:16.13.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]

# build the image
#
# docker build -f Dockerfile -t home-jungle-frontend:dev . 

# run the container
#
# docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true --name home-jungle-frontend home-jungle-frontend:dev
# -it //interactive mode
# --rm //remove the container after exit
# -v ${PWD}:/app //mount the code from this directory into the containers "/app" directory - necessary for hot reloads
# -v /app/node_modules //use the container version of node_modules
# -p 3000:3000 //map and publish app port to communicate with it from outside the container
# -e CHOKIDAR_USEPOLLING=true //enable hot reloads