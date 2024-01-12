const { deepEqual, ok } = require("assert");

const database = require("./database.js");
const DEFAULT_ITEM_CADASTRAR = { name: "Flash", poder: "Speed", id: 1 };
const DEFAULT_ITEM_ATUALiZAR = {
  name: "Lanterna verde",
  poder: "Forca",
  id: 2,
};

describe("Suite de manipulacao de herois", () => {
   beforeEach(async () =>{
      await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
      await database.cadastrar(DEFAULT_ITEM_ATUALiZAR)
   })

  it("deve pesquisar um heiroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);
    //const posicaoUm = resultado[0]

    deepEqual(resultado, expected);
  });

  it("deve cadastrar um heiroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(expected.id);

    deepEqual(actual, expected);
  });

  it("deve remover um heori por id", async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(resultado, expected);
  });

  it("deve atualizar um heori pelo id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALiZAR,
      nome: "Batman",
      poder: "dinheiro",
    };

    const novoDado = {
        nome: "Batman",
        poder: "dinheiro",

    }

     await database.atualizar(
      DEFAULT_ITEM_ATUALiZAR.id,
      novoDado
    );
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALiZAR.id)

    deepEqual(resultado, expected);

  });
});
