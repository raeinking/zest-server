const express = require( "express")
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createUser
} = require( "../../controllers/user")
const { verifyAdmin, verifyToken, verifyUser } = require( "../../utils/verifyToken")

const router = express.Router();
// 
router.get("/checkauthentication",verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})
// verifyUser
router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})
// , verifyAdmin
router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})

router.post("/",createUser);

//UPDATE, verifyUser
router.put("/user/:id", verifyUser,updateUser);

//DELETE, verifyUser
router.delete("/user/:id", verifyUser,deleteUser);

//GET, verifyUser
router.get("/user/:id",verifyUser, getUser);

//GET ALL, verifyAdmin
router.get("/all",getUsers);




module.exports = router;
