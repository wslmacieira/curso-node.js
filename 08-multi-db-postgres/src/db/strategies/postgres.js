const Sequelize = require('sequelize');
const config = require('./../../config');
const driver = new Sequelize(config);

const ICrud = require('./interfaces/ICrud');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._heroes = null;
        this._connect();
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.log('fail', error);
            return false;
        }
    }

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
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
        await this._heroes.sync();
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item);
        return dataValues
    }

    async read(item = {}) {
        return await this._heroes.findAll({ where: item,  raw: true })
    }

    async _connect() {
        this._driver = new Sequelize(config);
        await this.defineModel();
    }
}

module.exports = Postgres;
