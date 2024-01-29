import database from "../database/db.js";
import Projeto from "../models/projeto.js";
import Projeto_tag from "../models/projeto_tag.js";
import Tag from "../models/tag.js";

const showProjeto = async (req, res) => {
  await database.sync();
  const { id } = req.params;
  try {
    const projeto = await Projeto.findByPk(id, { include: Projeto_tag });

    const projetoTags = projeto.projeto_tags;

    let tags = [];

    projetoTags.forEach(async (tag) => {
      tags.push(await Tag.findByPk(tag.tag_id));
      console.log(tags);
    });

    return res.status(200).json({ projeto, tags });
  } catch (error) {
    console.log(error, "erro no controller de mostrar projeto");

    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

export default showProjeto;
