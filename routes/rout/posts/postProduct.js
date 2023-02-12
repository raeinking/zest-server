const express = require( "express")
const Product = require("../../../model/postProduct")
const {
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require( "../../../controllers/postProduct")
const { verifyAdmin, verifyToken, verifyUser } = require( "../../../utils/verifyToken");

const router = express.Router();

// //UPDATE, verifyUser
router.post("/update/:id",async (req, res) => {
  try {
    console.log(req.params.id)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.send('have some problem')
  }
});

// //DELETE, verifyUser
router.get("/delete/:id",async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect(req.get('referer'));
  } catch (err) {
    res.send('try again')
  }
});

// //GET, verifyUser
router.get("/:id",async (req , res) => {
  const products = await Product.findById(req.params.id);
  res.render('edit_admin', products )
});

// //GET ALL, verifyAdmin
router.get("/",getProducts);




module.exports = router;
