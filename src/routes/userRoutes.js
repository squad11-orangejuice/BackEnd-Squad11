import express from "express";
import loginSocial from "../controllers/loginSocial.js";
import userLogin from "../controllers/loginController.js";
import create from "../controllers/RegisterController.js";
import logout from "../controllers/logout.js";
// import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
const userRoutes = express();

userRoutes.post("/usuario/cadastrar", create);
userRoutes.post("/usuario/login", userLogin);
userRoutes.post("usuario/login/google", loginSocial);
userRoutes.post("/usuario/logout", logout);

// userRoutes.get("/descobrir", middlewareAutenticacao);

export default userRoutes;
