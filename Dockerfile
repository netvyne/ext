FROM node:12-slim
COPY package.json /ext/
COPY yarn.lock /ext/
RUN cd ext && yarn install