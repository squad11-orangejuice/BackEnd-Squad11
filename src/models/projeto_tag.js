const {DataTypes} = require("sequelize"); 

const database = require('../database/db');
const Projeto = require("./projeto");
const Tag = require("./tag");

const Projeto_tag = database.define('projeto_tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowsNull: false,
        primaryKey: true
    }
});

Projeto_tag.belongsTo(Projeto, {
    constraint: true,
    foreignKey: 'projeto_id'
});

Projeto.hasMany(Projeto_tag, {
    foreignKey: 'projeto_id'
});

Projeto_tag.belongsTo(Tag, {
    constraint: true,
    foreignKey: 'tag_id'
})

Tag.hasMany(Projeto_tag, {
    foreignKey: 'tag_id'
});

module.exports = Tag;
