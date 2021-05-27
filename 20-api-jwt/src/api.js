// npm i vision inert hapi-swagger
// npm install hapi-auth-jwt2 --save

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroesRoute = require('./routes/heroesRoutes')
const AuthRoute = require('./routes/authRoutes')

const hapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = 'MY_SECRET_KEY'

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
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: hapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 3600
        // }
        validate: (dado, request) => {
            // verifica no banco se usuario continua ativo
            // verifica no banco se usuario continua pagando

            return {
                isvalid: true // caso não valido e false
            }
        }
    })

    app.auth.default('jwt')
    
    app.route([
        ...mapRoutes(new HeroesRoute(context), HeroesRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ])

    await app.start()
    console.log("Servidor rodando na porta", app.info.port)

    return app;
}

module.exports = main()