FROM node:latest

WORKDIR /var/www/html

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "node", "index.js" ]

