const express = require( "express")
const { login, register , logout , getUsers } = require( "../../controllers/auth")

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/getall", getUsers)

module.exports = router