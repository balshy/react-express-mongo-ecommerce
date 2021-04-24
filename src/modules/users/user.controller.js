const asyncMiddleware = require("../../middlewares/async");

module.exports = {
  list: asyncMiddleware(async (req, res) => {}),
};
