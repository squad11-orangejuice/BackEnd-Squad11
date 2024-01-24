import express from "express";
import UserController from "../controllers/UserController.js";
const userRoutes = express();

userRoutes.post("/cadastrar", async (req, res) => {
  await UserController.create(req, res);
});
userRoutes.post("login");

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get("/home");

export default userRoutes;
