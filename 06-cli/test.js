const { deepStrictEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  nome: 'Flash',
  poder: 'Speed'
}

describe('Suite de manipulação de Heoris', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
  });

  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id); // = const posicaoUm = resultado[0];
    deepStrictEqual(resultado, expected);
  });

  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    deepStrictEqual(atual, expected);
  });

  it('deve remover um heroi por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepStrictEqual(resultado, expected);
  });
});
