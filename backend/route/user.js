const router = require("express").Router();
const { login } = require("../controller/login");

router.post("/api/login", login);

module.exports = router;