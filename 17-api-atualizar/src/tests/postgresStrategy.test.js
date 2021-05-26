const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const HeroesSchema = require('../db/strategies/postgres/schemas/heroesSchema')
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro', 
    poder: 'flexas' 
}
const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman', 
    poder: 'Dinheiro' 
}

let context = {}
describe('Postgres Strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroesSchema)
        context = new Context(new Postgres(connection, model))
        // await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

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

    it('atualizar', async function() {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})
        console.log('item', result);
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome)
        /*
        No Javascript temos uma tecnica chamada rest/spread 
        que é usado para mergear objetos ou separa-lo
        {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        {
            dataNascimento: '1998-01-01'
        }
        // final
         {
            nome: 'Batman',
            poder: 'Dinheiro',
            dataNascimento: '1998-01-01'
        }
        */
    })

    it('remover por id', async function() {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    })

})
