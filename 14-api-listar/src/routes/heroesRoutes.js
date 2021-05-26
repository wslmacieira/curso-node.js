const BaseRoute = require('./base/baseRoutes')

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    
                    console.log('limit', limit)
                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }

                    if(isNaN(skip)) 
                        throw Error('O tipo skip é incorreto')
                    if(isNaN(limit)) 
                        throw Error('O tipo limit é incorreto')

                    return this.db.read(query).skip(parseInt(skip)).limit(parseInt(limit));

                } catch (error) {
                    console.log('Deu Ruim', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }

}

module.exports = HeroesRoutes
