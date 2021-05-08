FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=
ENV MONGO_INITDB_ROOT_PASSWORD=
ENV MONGO_INITDB_DATABASE=film-app

EXPOSE 27017

COPY mongo-init.js /docker-entrypoint-initdb.d/init-mongo.js:ro

# CMD ["/docker-entrypoint-initdb.d/mongo-init.js"]