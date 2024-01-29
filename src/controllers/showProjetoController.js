import database from "../database/db.js";
import Projeto from "../models/projeto.js";

const showProjeto = async (req, res) => {
  await database.sync();
  const { id } = req.params;
  try {
    const projeto = await Projeto.findByPk(id);
    return res.status(200).json({ projeto });
  } catch (error) {
    console.log(error, "erro no controller de mostrar projeto");
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

export default showProjeto;
