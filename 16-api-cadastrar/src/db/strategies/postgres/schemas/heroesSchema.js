const Sequelize = require('sequelize')

const HeroesSchema = {
    name: 'heroes',
    schema: {

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
    },
    options: {
        tableName: 'tb_heroes',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = HeroesSchema