FROM node:18.14

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

COPY . .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install --frozen-lockfile; \
        else yarn install --prod; \
        fi

RUN yarn build

EXPOSE 3000
