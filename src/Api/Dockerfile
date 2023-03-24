FROM node:latest
RUN ls /var/lib/docker/overlay2/8a2577b78d0fe9066c00c1fed6bafce35b5ec17672822003ef2f343762941875/merged/app
WORKDIR /Api
RUN ls
ADD package.json /Api
ADD tsconfig.json /Api
ADD . /Api
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "node", "." ]
