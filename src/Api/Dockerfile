FROM node:latest
RUN ls /usr
ADD package.json /app
ADD tsconfig.json /app
RUN cat package.json
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "node", "." ]

