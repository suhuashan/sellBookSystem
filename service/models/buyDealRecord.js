var Sequelize = require("sequelize");
var sequelize = require("../db.js");

module.exports = sequelize.define(
    'buyDealRecord',
    {
        nid: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        username: Sequelize.STRING(),
        avatar: Sequelize.STRING(),
        bookName: Sequelize.STRING(),
        bookDesc: Sequelize.STRING(),
        position: Sequelize.STRING(),
        time: Sequelize.STRING(),
        buyer: Sequelize.STRING()
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true
    }
)