import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import database from "../database/db.js";
import User from "../models/user.js";
import Token from "../models/token.js";

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

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PASSWORD || "1209u39u01uqeuribquirbiqg791t4g791g91"
    );

    await Token.create({
      token,
      isValid: true,
      user_id: user.id,
    });

    const { password: _, userLogado } = user;

    return res.status(201).json({ userLogado, token: token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor!" });
  }
};

export default create;
