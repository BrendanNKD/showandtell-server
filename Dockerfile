FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN ls -a
RUN yarn
RUN yarn build

EXPOSE 4000

CMD ["node", "lib/main.js"]