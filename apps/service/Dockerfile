FROM node:16.14-alpine AS base
RUN apk update
WORKDIR /app
ENV YARN_CACHE_FOLDER=.yarn-cache

FROM base AS pruner
RUN yarn global add turbo@1.3.1
COPY . .
RUN turbo prune --scope=service --docker

FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM base AS prod-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER} 
RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts
RUN rm -rf /app/${YARN_CACHE_FOLDER}

FROM base
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/apps/service/dist .
EXPOSE 8080
WORKDIR /app
ENV FASTIFY_ADDRESS=0.0.0.0
CMD ["node", "main.mjs"]
