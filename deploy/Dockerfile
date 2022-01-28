FROM node:12-alpine

WORKDIR /var/www/html

COPY . .

RUN npm ci

EXPOSE 5000

CMD [ "node", "index.js" ]

