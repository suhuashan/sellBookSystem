var Sequelize = require("sequelize");
var sequelize = require("../db.js");

module.exports = sequelize.define(
    "user",
    {
        nid: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        username: {
            unique: true,
            type: Sequelize.STRING
        },
        password: Sequelize.STRING(),
        weixin: Sequelize.STRING(),
        phone: Sequelize.STRING()
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true
    }
)