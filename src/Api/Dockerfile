FROM node:latest
ENV PORT=8080 
WORKDIR /app
ARG http_proxy=http://193.49.118.36:8080 https_proxy=http://193.49.118.36:8080
COPY package*.json .
COPY tsconfig.json . 
COPY . .

RUN npm install
RUN npm run build

#EXPOSE 8080
CMD [ "node","." ]
