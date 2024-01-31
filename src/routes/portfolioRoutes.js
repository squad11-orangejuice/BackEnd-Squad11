import express from "express";
import deleteProjeto from "../controllers/deleteProjetoController.js";
import middlewareAutenticacao from "../middleware/middlewareAutenticacao.js";
import middlewareUserProjeto from "../middleware/middlewareUserProjeto.js";
import editarProjeto from "../controllers/editarProjeto.js";
import verPortfolio from "../controllers/verPortfolio.js";
import novoProjeto from "../controllers/novoProjeto.js";
import verProjeto from "../controllers/verProjeto.js";

const portfolioRoutes = express();

portfolioRoutes.use(middlewareAutenticacao);

portfolioRoutes.get("/portfolio", verPortfolio);
portfolioRoutes.post("/projeto/novo", novoProjeto);
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.use("/projeto/:id", middlewareUserProjeto);

portfolioRoutes.put("/projeto/:id", editarProjeto);
portfolioRoutes.delete("/projeto/:id", deleteProjeto);
portfolioRoutes.get("/projeto/show/:id", verProjeto);

export default portfolioRoutes;
