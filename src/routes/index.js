const express = require("express");
const router = express.Router();

const apiRoutes = require("./api.route");

// api routes
apiRoutes.forEach(({ path, validator, auth, callback }) => {
  auth = (!!auth && isAuth) || [];

  router.use(path, validator, auth, callback);
});
// api routes

module.exports = router;
