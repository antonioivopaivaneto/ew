/*

0-obter usuario
1-obter numedo de teelfone dop usuario
2-obter o endereco paa o usuario pelo Id

*/

function obterUsuario(callback){
    setTimeout(function ()  {
        return callback(null,{
            id:1,
            nome:'aladin',
            dataNascimento:new Date()
        })
    }, 1000);

}

function obterTelefone(idUsuario,callback){
    setTimeout(() => {
        return callback(null,{
            telefone:'11980808080',
            ddd:11
        })
    }, 1000);
}

function obterEndereco(isUsuario,callback){
    setTimeout(() => {
        return callback(null,{
            rua:'dos bobos',
            numero:0
        });
        
    }, 2000);

}



function resolverUsuario(erro, usuario){ 
}
function resolverEndereco(erro, usuario){ 
}
function resolverTelefone(erro, usuario){ 
}

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
//const telefone = obterTelefone(usuario.id);


//console.log('usuario',telefone);