const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  nameEnglish:{
    type:String
  },
  nameSorany:{
    type:String
  },
  nameBadini:{
    type:String
  },
  nameTurkish:{
    type:String
  },
  nameArabic:{
    type:String
  },
  discriptionEnglish:{
    type:String
  },
  discriptionSorany:{
    type:String
  },
  discriptionBadini:{
    type:String
  },
  discriptionTurkish:{
    type:String
  },
  discriptionArabic:{
    type:String
  },
  image: {
    type: String
  },
  price: {
    type:String
  },
  discountPrice: {
    type:String
  },
  packegCount:{
    type: String
  },
  stock:{
    type:String
  },
  catagory: {
    type: String
  },
  unity: {
    type:String
  },
  brand: {
    type:String
  },
  packegeCount: {
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema)