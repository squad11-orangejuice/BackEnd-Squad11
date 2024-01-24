const {DataTypes} = require("sequelize"); 

const database = require('../database/db');
const User = require("./user");

const Projeto = database.define('projeto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowsNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowsNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowsNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowsNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.DATE,
        allowsNull: false
    }
});

Projeto.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id'
});

User.hasMany(Projeto, {
    foreignKey: 'user_id'
});

module.exports = Projeto;