const assert = require('assert');
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A Mira'
}

let MOCK_ID = ''

describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await (await api).inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
        console.log('MOCK_ID ->', MOCK_ID)
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

    it('listar /heroes - limit não pode ser string', async () => {
        const limit = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${limit}`
        })
        const erroResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"skip\" must be greater than or equal to 1",
            "validation": { "source": "query", "keys": ["skip"] }
        }

        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(erroResult))
    })

    it('cadastrar /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/heroes`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode
        console.log('statusCode', statusCode)
        const { message, _id } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('atualizar PATCH - /heroes/:id', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, "Heroi atualizado com sucesso!")
    })

    it('atualizar PATCH - /heroes/:id - não deve atualizar com o ID incorreto', async () => {
        const _id = '60ac2e377b28301bc6f77777'
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, "Não foi possivel atualizar!")
    })

    it('remover DELETE - /heroes/:id', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, "Heroi removido com sucesso!")
    })

    it.only('remover DELETE - /heroes/:id não deve remover', async () => {
        const _id = '60ac2e377b28301bc6f77777'
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, 'Não foi possivel remover o item')
    })
})