// npm i vision inert hapi-swagger
const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroesRoute = require('./routes/heroesRoutes')

const hapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {

    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroesSchema))

    const swaggerOptions = {
        info: {
            title: 'API Heroes - #CursoNodeBR',
            version: 'v1.0'
        }
    }

    await app.register([
        Vision,
        Inert,
        {
            plugin: hapiSwagger,
            options: swaggerOptions
        }
    ])
    
    app.route(
        mapRoutes(new HeroesRoute(context), HeroesRoute.methods())
    )

    await app.start()
    console.log("Servidor rodando na porta", app.info.port)

    return app;
}

module.exports = main()