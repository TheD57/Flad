FROM node:latest

ADD package.json /app
ADD tsconfig.json /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "node", "." ]

