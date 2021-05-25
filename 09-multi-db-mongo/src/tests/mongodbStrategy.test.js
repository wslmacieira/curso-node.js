const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        // await context.connect()
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado'
        assert.deepStrictEqual(result, expected)
    })

    it.only('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

})