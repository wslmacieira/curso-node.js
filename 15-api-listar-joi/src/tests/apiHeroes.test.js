const assert = require('assert');
const api = require('./../api')
let app = {}

describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes'
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
            url: `/heroes?limit=${limit}`
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
        const erroResult = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"Invalid request query input"
        }

        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(erroResult))
    })
})