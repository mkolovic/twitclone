FROM node:7.2.1
MAINTAINER Mladen Kolovic <mkolovic@uwaterloo.ca>

EXPOSE 8080
ENV APP /opt/twitclone

RUN mkdir -p $APP
WORKDIR $APP

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json $APP
RUN npm install && npm install --global nodemon

COPY src/ $APP


CMD ["node", "server.js"]
