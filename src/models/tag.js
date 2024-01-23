const {DataTypes} = require("sequelize"); 

const database = require('../database/db');

const Tag = database.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowsNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowsNull: false,
    }
});

module.exports = Tag;
