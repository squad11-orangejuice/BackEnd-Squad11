import Projeto from "../models/projeto.js";
import User from "../models/user.js";
import Tag from "../models/tag.js";
import database from "../database/db.js";

const showProjeto = async (req, res) => {
  await database.sync();
  const id = req.params.id;
  try {
    const projeto = await Projeto.findByPk(id, {
      attributes: ["titulo", "link", "descricao", "imagem", "data"],
      include: [
        {
          model: User,
          attributes: ["nome", "sobrenome"],
        },
        {
          model: Tag,
          attributes: ["nome"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(projeto);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return res.status(500).send("Erro no servidor.");
  }
};

export default showProjeto;
