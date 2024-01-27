import database from "../database/db.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* Recebe o token no header, identifica o usuário e valida com o jwt */

const middlewareAutenticacao = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Usuário não autorizado");
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD);
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).send("Usuário não autorizado.");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Erro na autenticação", error);
    return res.status(500).send("Erro interno do servidor.");
  }
};

export default middlewareAutenticacao;
