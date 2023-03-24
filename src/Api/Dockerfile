FROM node:latest
WORKDIR /Api
RUN ls
ADD package.json /Api
ADD tsconfig.json /Api
ADD . /Api
RUN npm install
RUN npm run build
EXPOSE 8080
