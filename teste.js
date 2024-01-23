(async () => {
    const database = require('./src/database/db');
    const user = require('./src/models/user');
    const tag = require('./src/models/tag');
    await database.sync();
})();