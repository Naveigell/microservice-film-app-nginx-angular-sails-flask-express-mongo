FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install
RUN npm install -g sails

COPY . .

EXPOSE 8000

CMD ["sails", "lift"]