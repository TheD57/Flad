FROM node:latest
RUN ls
ADD package.json /app
ADD tsconfig.json /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "node", "." ]

