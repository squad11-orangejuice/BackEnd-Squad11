import express from "express";

import create from "../controllers/RegisterController.js";
const userRoutes = express();

userRoutes.post("/cadastrar", create);
userRoutes.post("login");

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get("/home");

export default userRoutes;
