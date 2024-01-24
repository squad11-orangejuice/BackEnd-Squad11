(async () => {
  const database = require("./src/database/db");
  const user = require("./src/models/user");
  const tag = require("./src/models/tag");
  const projeto = require("./src/models/projeto");
  const projeto_tag = require("./src/models/projeto_tag");
  const Token = require("./src/models/token");

  await database.sync({ force: true });
})();
