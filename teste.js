import database from "./src/database/db.js";
import Projeto from "./src/models/projeto.js";
import Projeto_tag from "./src/models/projeto_tag.js";
import Tag from "./src/models/tag.js";
import User from "./src/models/user.js";

(async () => {
  await database.sync();

  await User.findAll();
  await Projeto.findAll();
  await Tag.findAll();
  await Projeto_tag.findAll();
})();
