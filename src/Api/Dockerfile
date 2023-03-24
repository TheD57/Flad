FROM node:latest
RUN ls /usr
ADD package.json /app
ADD tsconfig.json /app
RUN cat package.json
RUN find . -name package.json -type f -print
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN find . -name package.json -type f -print
RUN find /app -name package.json -type f -print
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "node", "." ]

