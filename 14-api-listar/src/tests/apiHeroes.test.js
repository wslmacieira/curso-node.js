const assert = require('assert');
const api = require('./../api')
let app = {}

describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar /heroes - deve retornar somente 10 registros', async () => {
        const limit = 3
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${limit}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === limit)
    })

    it('listar /heroes - deve retornar somente 10 registros', async () => {
        const limit = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${limit}`
        })

        assert.deepStrictEqual(result.payload, 'Erro interno no servidor')
    })
})