/*

0-obter usuario
1-obter numedo de teelfone dop usuario
2-obter o endereco paa o usuario pelo Id

*/

const util = require("util");

const obterEnderesoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //return reject(new Error('deu ruim'));
      return resolve({
        id: 1,
        nome: "aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "11980808080",
        ddd: 11,
      });
    }, 1000);
  });
}

function obterEndereco(isUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

main();
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario();
    //const telefone = await obterTelefone(usuario.id);
    //const endereco = await obterEnderesoAsync(usuario.id);

    const resultado = await Promise.all([
        obterTelefone(usuario.id),
        obterEnderesoAsync(usuario.id)
    ])

    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
        Nome ${usuario.nome}
        Telefone ( ${telefone.ddd}) ${telefone.telefone}
        Endereço ${endereco.rua}, ${endereco.numero}
        
        `);

        console.timeEnd('medida-promise')

  } catch (error) {
    console.error(error);
  }
}

/*
const usuarioPromise = obterUsuario();

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.idUsuario).then(function resolverTelefone(
      result
    ) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (result) {
    const endereco = obterEnderesoAsync(result.usuario.id);
    return endereco.then(function resolverEndereco(endereco) {
      return {
        usuario: result.usuario,
        telefone: result.telefone,
        endereco: endereco,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
        Telefone: ${resultado.telefone.ddd} ${resultado.telefone.telefone}
    
    `);
  })
  .catch(function (error) {
    console.error("Error", error);
  });

  */

/*
obterUsuario(function resolverUsuario(error,usuario){
    if(error){
        console.error('error',error)
        return
    }
    obterTelefone(usuario.id,function resolverTelefone(error1, telefone){
        if(error1){
            console.error('error',error1)
            return
        }
   
    obterEndereco(usuario.id,function resolverEndereco(error2, endereco){
        if(error2){
            console.error('error',error2)
            return
        }


    console.log(`
    Nome:${usuario.nome},
    Endereco: ${endereco.rua},  ${endereco.numero}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    
    `)

})
})

});
*/
