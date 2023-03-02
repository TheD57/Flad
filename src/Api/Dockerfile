FROM node:latest
ENV PORT=8080 
WORKDIR /app
ARG http_proxy=http://193.49.118.36:8080 https_proxy=http://193.49.118.36:8080
COPY package*.json ./
COPY . .

RUN npm install
RUN echo $?

#EXPOSE 8080
#CMD [ "node", "server.js" ]
