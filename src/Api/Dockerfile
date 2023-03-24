FROM node:latest
ADD package.json /app
ADD tsconfig.json /app
ADD . /app
RUN mkdir /app
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "node", "." ]
