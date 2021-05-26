
const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroesRoute = require('./routes/heroesRoutes')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    // ['list', 'create', 'update']
    // new HeroesRoute['list']()
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroesSchema))
    
    app.route([
        ...mapRoutes(new HeroesRoute(context), HeroesRoute.methods())
    ])

    await app.start()
    console.log("Servidor rodando na porta", app.info.port)

    return app;
}

module.exports = main()