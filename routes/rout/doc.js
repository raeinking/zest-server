const express = require( "express")
const Product = require("../../model/doc")
const {
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require( "../../controllers/doc")
const { verifyAdmin, verifyToken, verifyUser } = require( "../../utils/verifyToken");

const router = express.Router();

// //DELETE, verifyUser
router.get("/delete/:id",async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/doctors');
  } catch (err) {
    res.send('try again')
  }
});

//GET, verifyUser
router.get("/get/:id",async (req , res) => {
  const products = await Product.findById(req.params.id);
  res.render('edit_doc', products )
});

// //GET ALL, verifyAdmin
router.get("/",getProducts);




module.exports = router;
