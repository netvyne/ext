FROM node:12-slim
COPY package.json /ext/
RUN cd ext && npm install