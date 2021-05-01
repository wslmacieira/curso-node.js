const { deepStrictEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  nome: 'Flash',
  poder: 'Speed'
}

describe('Suite de manipulação de Heoris', () => {
  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id); // = const posicaoUm = resultado[0];
    deepStrictEqual(resultado, expected);
  });

  // it('deve cadastrat um heroi, usando arquivos', async () => {
  //   const expected = {};
  //   //
  //   ok(null, expected);
  // })
});
