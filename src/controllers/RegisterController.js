import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import database from "../database/db.js";
import User from "../models/user.js";
import Token from "../models/token.js";

dotenv.config();

const create = async (req, res) => {
  await database.sync();

  const { nome, sobrenome, email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
    }

    let newPassword = password;
    newPassword = newPassword.toString();
    let salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const user = await User.create({
      nome,
      sobrenome,
      email,
      password: passwordHash,
    });

    return res.status(201).json({ mensagem: "Cadastro feito com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor!" });
  }
};

export default create;
