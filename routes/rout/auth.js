const express = require( "express")
const { login, register , logout , getUsers, Delete } = require( "../../controllers/auth")

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/delete/:id", Delete)
router.get("/getall", getUsers)

module.exports = router