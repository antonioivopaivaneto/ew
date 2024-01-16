const {Command} = require('commander');
const database = require('./database.js');
const Heroi = require('./heroi');

async function main() {
    const program = new Command()

    program
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "Id do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-l, --listar', "Listar Heróis")
        .option('-r, --remover [value]', "remover Heróis pelo id")
        .option('-a, --atualizar [value]', "atualizar Heróis pelo id")

        program.parse(process.argv);

    const options = program.opts()
    const heroi = new Heroi(options);

    try {
        //cadastrar
        if (options.cadastrar) {
            delete heroi.id

            const resultado = await database.cadastrar(heroi);
            if (!resultado) {
                console.error("Não cadastrou o herói");
                return;
            }
            console.log('Herói cadastrado com sucesso');
        }

        if (options.listar) {
            console.log('Herói cadastrado');
            const resultado = await database.listar();
            console.log(resultado);
            return;
        }
        if(options.remover){
            const resultado = await database.remover(heroi.id);
            if(!resultado){
                console.error('nao foi possivel remover o heroi');
                return
            }
            console.log('heroi removido com sucesso');

        }
        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar)

            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await database.atualizar(idParaAtualizar,heroiAtualizar)

            if(!resultado){
                console.error("nao foi possivel atualizar")
                return
            }
            console.log('heroi atualiza com sucesso')

        }
    } catch (err) {
        console.error(err);
    }
}

main();
