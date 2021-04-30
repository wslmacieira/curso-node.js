/*
1 Obter um usuario
2 Obter o numero de telefone de um usuario a partir de seu id
3 Obter o endereco do usuario pelo Id
*/
// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('DEU RUIM DE VERDADE!!!'))
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000);
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '1199002',
        ddd: 11
      })
    }, 2000);
  })

}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000);
}

const usuarioPromise = obterUsuario()

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            id: usuario.id,
            nome: usuario.nome
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
    Nome: ${resultado.usuario.nome}
    Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
  })
  .catch(function (error) {
    console.log('DEU RUIM', error);
  })



// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || "" || 0 === false
//   if (error) {
//     console.log('DEU RUIM em USUARIO', error)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.log('DEU RUIM em TELEFONE', error1)
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.log('DEU RUIM em ENDERECO', error2)
//         return;
//       }

//       console.log(`
//       Mome: ${usuario.nome},
//       Endereco: ${endereco.rua}, ${endereco.numero},
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })
// });
// const telefone = obterTelefone(usuario.id);


// console.log('telefone', telefone);
