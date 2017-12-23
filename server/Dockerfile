FROM node:8.4.0

ENV APP_ROOT=/nus-eats

WORKDIR $APP_ROOT

COPY package.json yarn.lock $APP_ROOT/
RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build
CMD yarn start
