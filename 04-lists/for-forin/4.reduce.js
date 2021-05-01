const { obterPessoas } = require('./service');

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== 'undefined' ? valorInicial : this[0]
  for (let index = 0; index < this.length; index++) {
    valorFinal = callback(valorFinal, this[index], this)
  }
  return valorFinal;
}

async function main() {
  try {
    const { results } = await obterPessoas('a');
    const pesos = results.map(item => Number(item.height))
    // const total = pesos.reduce((acc, height) => {
    //   return acc + height;
    // }, 0)
    const minhaLista = [
      ['Wagner', 'Santos'],
      ['NodeBR', 'DWL']
    ]
    const total = minhaLista.reduce((acc, lista) => {
      return acc.concat(lista)
    }, [])
      .join(', ')

    console.log('pesos: ', pesos)
    console.log('total: ', total)

  } catch (error) {
    console.log('DEU RUIM', error);
  }
}

main();
