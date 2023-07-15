FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

COPY . .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install; \
        else yarn install --prod; \
        fi

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]