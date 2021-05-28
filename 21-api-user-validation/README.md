# Módulo 5 - Bancos de Dados - Nosso projeto Multi-banco de dados

- Trabalhando com o padrão Strategy para Multi DataSources

## Instalando docker para usar o MongoDB e Postgres

```shell
docker run \
    --name postgres \
    -e POSTGRES_USER=wslmacieira \
    -e POSTGRES_PASSWORD=gostack \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=gostack \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p gostack --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'wslmacieira', pwd: 'gostack', roles: [{role: 'readWrite', db: 'herois'}]})"
```