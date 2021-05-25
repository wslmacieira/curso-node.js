const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homen Aranha-${Date.now()}`,
    poder: 'Super Teia'
}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
    await context.create(MOCK_HEROI_DEFAULT)
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado'
        assert.deepStrictEqual(result, expected)
    })

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it.only('listar', async () => {
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = {
            nome,
            poder
        }
        
        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT)
    })

})