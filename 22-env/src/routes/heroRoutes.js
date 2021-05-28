const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
    throw erro
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            options: {
                tags: ['api'],
                description: 'listar herois',
                notes: 'retorna a base inteira de herois',
                validate: {
                    failAction,
                    headers,
                }
            },
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                tags: ['api'],
                description: 'cadastrar herois',
                notes: 'Cadastra um heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(100),
                    })
                },

            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            options: {
                tags: ['api'],
                description: 'atualizar herois',
                notes: 'atualiza um heroi por ID',
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
                },

            },
            handler: (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                return this.db.update(id, payload)
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            options: {
                tags: ['api'],
                description: 'remover herois',
                notes: 'remove um heroi por id',
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: (request, headers) => {
                const id = request.params.id;
                return this.db.delete(id)
            }
        }
    }

}

module.exports = HeroRoutes