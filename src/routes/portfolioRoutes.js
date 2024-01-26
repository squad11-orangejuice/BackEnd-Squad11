import express from "express";
import deleteProjeto from "../controllers/deleteProjetoController.js";

const portfolioRoutes = express();

portfolioRoutes.get("/portfolio");
portfolioRoutes.post("/projeto/novo");
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.put("/projeto/editar/:id");
portfolioRoutes.delete("/projeto/deletar/:id", deleteProjeto);
portfolioRoutes.get("/projeto/:id");

export default portfolioRoutes;
