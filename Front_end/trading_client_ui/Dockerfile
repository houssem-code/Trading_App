FROM node:12-alpine as build
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

 


RUN chmod +x node_modules/.bin/react-scripts

 

RUN npm run build

 

FROM nginx:1.16.0-alpine

 

COPY --from=build /app/build /usr/share/nginx/html