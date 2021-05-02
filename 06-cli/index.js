const { Command } = require('commander');
const Commander = new Command();
const options = Commander.opts();
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  Commander.version('v1')
    .option('-n, --nome [value]', "Nome do heroi")
    .option('-p, --poder [value]', "Poder do heroi")
    .option('-i, --id [value]', "Id do heroi")

    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar um heroi")
    .option('-r, --remover', "Remove um heroi")
    .option('-a, --atualizar [value]', "Atualizar um heroi")
    .parse(process.argv)

  const heroi = new Heroi(options);
  try {
    if (options.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) {
        console.error('Heroi não foi cadastrado');
        return;
      }
      console.log('Heroi Cadastrado com sucesso!');
    }
    if (options.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
      return;
    }
    if (options.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error('não foi possivel remover heroi');
        return;
      }
      console.error('Heroi Removido com sucesso!');
    }
    if (options.atualizar) {
      const idParaAtualizar = parseInt(options.atualizar);
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
      if (!resultado) {
        console.error('Não foi possivel atualizar o heroi');
        return;
      }
      console.log('Heroi Atualizado com sucesso!');
    }

  } catch (error) {
    console.log('DEU RUIM', error);
  }
}

main();
