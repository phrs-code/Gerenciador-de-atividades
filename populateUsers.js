const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./src/model/user.model");
const Task = require("./src/model/task.model");

const ResponsavelSchema = new mongoose.Schema({}, {
  strict: false,
  collection: "responsaveis"
});

const Responsavel = mongoose.model(
  "responsaveis",
  ResponsavelSchema
);

function gerarEmail(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ".") + "@taskinsight.com";
}

async function run() {

    await mongoose.connect(process.env.MONGO_DB_URI, {
    dbName: "name_db"
    });

    console.log("Banco conectado:", mongoose.connection.db.databaseName);

    const collections = await mongoose.connection.db
    .listCollections()
    .toArray();

    console.log(
    "Collections:",
    collections.map(c => c.name)
    );

  const responsaveis = await Responsavel.find();

  console.log(`Encontrados ${responsaveis.length} responsáveis`);

  for (const resp of responsaveis) {

    const email = gerarEmail(resp.nome);

    let user = await User.findOne({ email });

    if (!user) {

      user = await User.create({
        name: resp.nome,
        email,
        password: "123456",
        age: 30,
        papel: resp.papel,
        departamento: resp.departamento,
        anos_empresa: resp.anos_empresa
      });

      console.log(`Usuário criado: ${resp.nome}`);
    } else {

        user.papel = resp.papel;
        user.departamento = resp.departamento;
        user.anos_empresa = resp.anos_empresa;

        await user.save();

        console.log(`Usuário atualizado: ${resp.nome}`);
      }

    const resultado = await Task.updateMany(
      { responsavel: resp.nome },
      {
        $set: {
          userId: user._id
        }
      }
    );

    console.log(
      `${resp.nome}: ${resultado.modifiedCount} tasks atualizadas`
    );
  }

  console.log("Concluído!");
  process.exit();

}

run().catch(err => {
  console.error(err);
  process.exit(1);
});