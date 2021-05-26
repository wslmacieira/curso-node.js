const BaseRoute = require('./base/baseRoutes')
const Joi = require('joi')

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            options: {
                validate: {
                    query: Joi.object({
                        skip: Joi.number().integer().min(1).max(100).default(0),
                        limit: Joi.number().integer().min(1).max(100).default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    const query = nome ? { 
                        nome: {
                            $regex: `.*${nome}*.`
                        } 
                    } : {}

                    return this.db.read(query).skip(skip).limit(limit);

                } catch (error) {
                    console.log('Deu Ruim', error)
                    return "Erro interno no servidor"
                }
            },
        }
    }

}

module.exports = HeroesRoutes
