const {DataTypes} = require("sequelize"); 

const database = require('../database/db');

const User = database.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowsNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowsNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowsNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowsNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
});

module.exports = User;
