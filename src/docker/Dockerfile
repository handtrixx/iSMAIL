FROM node:lts

USER root

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /app

RUN apt-get update && apt-get install -y curl git jq && rm -rf /var/lib/apt/lists/* && apt-get clean

RUN mkdir -p /app/data
RUN chown -R node:node /app

COPY ../ /app

COPY ./config.example.yml /app/config.yml

RUN npm install -g pnpm
USER node

WORKDIR /app


ENTRYPOINT ["/entrypoint.sh"]