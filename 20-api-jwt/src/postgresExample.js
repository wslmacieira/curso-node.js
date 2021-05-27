// npm install sequelize pg-hstore pg
const Sequelize = require('sequelize');
const config = require('./config');
const driver = new Sequelize(config);

async function main() {
  const Heroes = driver.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      required: true,
    },
    poder: {
      type: Sequelize.STRING,
      required: true,
    },
  }, {
    tableName: 'tb_heroes',
    freezeTableName: false,
    timestamps: false
  })
  await Heroes.sync();
  await Heroes.create({
    nome: 'Lanterna Verde',
    poder: 'Anel'
  })

  const result = await Heroes.findAll({
    raw: true,
    attributes: ['nome']
  });

  console.log('result', result)
}

main();
