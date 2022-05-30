const router = require("express").Router();
const { login, user } = require("../controller/login");

router.post("/api/login", login);
/* tutorial */
router.post("/", user);
/* tutorial */

module.exports = router;