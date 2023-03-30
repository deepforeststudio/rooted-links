FROM node:18-alpine as builder

WORKDIR /app
RUN chown node:node /app

USER node
COPY --chown=node:node . .
RUN yarn install
RUN yarn global add gatsby-cli
ENV GATSBY_TELEMETRY_DISABLED=1
RUN yarn build

FROM node:18-alpine
USER node
ENV GATSBY_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /app/ /app/
RUN rm -rf ./src
WORKDIR /app

EXPOSE 9000
CMD ["node_modules/.bin/gatsby", "serve", "-H", "0.0.0.0"]