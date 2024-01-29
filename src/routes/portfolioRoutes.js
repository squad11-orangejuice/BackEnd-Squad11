import express from "express";
import deleteProjeto from "../controllers/deleteProjetoController.js";
// import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
import middlewareUserProjeto from "../middleware/middlewareUserProjeto.js";
import showProjeto from "../controllers/showProjetoController.js";

const portfolioRoutes = express();

// portfolioRoutes.use(middlewareAutenticacao);

portfolioRoutes.get("/portfolio");
portfolioRoutes.post("/projeto/novo");

portfolioRoutes.get("/projeto/show/:id", showProjeto);
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.use("/projeto/:id", middlewareUserProjeto);

portfolioRoutes.put("/projeto/:id");
portfolioRoutes.delete("/projeto/:id", deleteProjeto);

export default portfolioRoutes;
