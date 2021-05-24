const { market } = require("../api/ccp");
const { check, validationResult } = require("express-validator");

module.exports = [
  {
    path: "/api/market/list",
    validator: [],
    auth: false,
    callback: async (req, res) => {
      const validator = validationResult(req);

      if (!validator.isEmpty()) {
        res.status(422).json({
          ok: false,
          errors: validator.errors,
        });
        return;
      }

      try {
        // const { draw, start, length } = req.body;
        let result = await market.list();
        result?.ok && res.json(result);
      } catch (error) {
        res.status(401).send({
          reason: "Failed fetch listing",
          code: 401,
          others: error,
        });
      }
    },
  },
];
