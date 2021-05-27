const assert = require('assert')
const { internal } = require('boom')
const api = require('../api')
let app = {}

describe('Auth test suit', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it.only('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'xuxadasilva',
                password: '123456'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('dados', dados)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})