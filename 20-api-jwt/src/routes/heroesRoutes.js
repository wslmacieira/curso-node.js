const BaseRoute = require('./base/baseRoutes')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

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
                tags: ['api'],
                description: 'lista herois',
                notes: 'pode paginar resultados e filtrar por nome',
                validate: {
                    failAction,
                    headers,
                    query: Joi.object({
                        skip: Joi.number().integer().max(100).default(0),
                        limit: Joi.number().integer().min(1).max(100).default(10),
                        nome: Joi.string().min(3).max(100)
                    }),
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
                    return Boom.internal()
                }
            },
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            options: {
                tags: ['api'],
                description: 'cadastrar heroi',
                notes: 'pode cadastrar heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(100),
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    console.log('result', result)
                    return {
                        message: "Heroi cadastrado com sucesso!",
                        _id: result._id
                    }
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            options: {
                tags: ['api'],
                description: 'atulaizar heroi',
                notes: 'pode atualizar qualquer campo',
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    headers,
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(100),
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const { payload } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.nModified !== 1) {
                        return {
                            message: "Não foi possivel atualizar!"
                        }
                    }

                    return {
                        message: "Heroi atualizado com sucesso!"
                    }

                } catch (error) {
                    console.log('DEU RUIM!', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            options: {
                tags: ['api'],
                description: 'remove heroi',
                notes: 'pode remover heroi',
                validate: {
                    failAction,
                    headers,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const result = await this.db.delete(id)

                    console.log('result ->', result)
                    if (result.n !== 1) {
                        return {
                            message: 'Não foi possivel remover o item'
                        }
                    }

                    return {
                        message: "Heroi removido com sucesso!"
                    }
                } catch (error) {
                    console.log('DEU RUIM!', error)
                    return Boom.internal()
                }
            }
        }
    }

}

module.exports = HeroesRoutes
