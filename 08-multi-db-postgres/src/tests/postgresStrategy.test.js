const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: 'Gavião Negro', poder: 'flexas' }

describe('Postgres Strategy', function () {
    this.timeout(Infinity);

    it('Postgres Connection', async function () {
        const result = await context.isConnected();
        assert.strictEqual(result, true);
    });

    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        // const posicaoZero = result[0]
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })

})
