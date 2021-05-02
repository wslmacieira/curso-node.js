## Postgres

docker run \
--name postgres \
-e POSTGRES_USER=wslmacieira \
-e POSTGRES_PASSWORD=gostack \
-e POSTGRES_DB=heroes \
-p 5432:5432 \
-d \
postgres

## Adminer

docker run \
--name adminer \
-p 8080:8080 \
--link postgres:postgres \
-d \
adminer

## MongoDB

docker run \
--name mongodb \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=gostack \
-d \
mongo

<!-- docker run \
--name mongoclient \
-p 3000:3000 \
--link mongodb:mongodb \clear
-d \
mongoclient/mongoclient -->

docker exec -it mongodb \
mongo --host localhost -u admin -p gostack --authenticationDatabase admin \
--eval "db.getSiblingDB('heroes').createUser({user: 'username', pwd: 'gostack', roles: [{role: 'readWrite', db: 'heroes'}]})"
