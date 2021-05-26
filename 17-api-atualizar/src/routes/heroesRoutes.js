const BaseRoute = require('./base/baseRoutes')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
    throw erro
}

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
                    failAction,
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

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            options: {
                validate: {
                    failAction,
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
                    return 'Internal Error'
                }
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            options: {
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
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
                    
                    if(result.nModified !== 1) {
                        return {
                            message: "Não foi possivel atualizar!"
                        }
                    }

                    return {
                        message: "Heroi atualizado com sucesso!"
                    }

                } catch (error) {
                    console.log('DEU RUIM!', error)
                    return 'Erro interno'
                }
            }
        }
    }

}

module.exports = HeroesRoutes
