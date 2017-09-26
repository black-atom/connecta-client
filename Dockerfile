FROM node

RUN git clone https://github.com/black-atom/connecta-client.git /var/www \
    && cd /var/www \
    && npm install --global rimraf \
    && npm install --global webpack webpack-dev-server typescript@2.1.5 \
    && yarn \
    && npm run prebuild:prod && npm run build:prod

EXPOSE 8080

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "server:prod"]
