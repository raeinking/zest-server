var express    = require("express");
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser')
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const multer = require( "multer")
const cors = require( "cors")
const path = require( "path")
const fs = require('fs');



//////// ROUTES LOCATION ///////////
var dashboard  = require("./routes/dashboard.js");
var products   = require("./routes/products.js");
var useronline   = require("./routes/useronline.js");
var customers  = require("./routes/customers.js");
var orders  = require("./routes/orders.js");
var adminstrators  = require("./routes/adminstrators.js");
var delivery_boy  = require("./routes/delivery_boy.js");
var inventory  = require("./routes/inventory.js");
var reklam  = require("./routes/reklam.js");
var reklam_edit  = require("./routes/edit_reklam");
var doctors  = require("./routes/doctors.js");
var FBrand  = require("./routes/FBrand.js");
var addFbrand  = require("./routes/add_animaltype");
var AAnimal  = require("./routes/AAnimal.js");
var AFillter  = require("./routes/AFillter.js");
var settings  = require("./routes/settings.js");
var addanimal  = require("./routes/addanimal.js");
var editanimal  = require("./routes/edit_animal.js");
var s  = require("./routes/add_doc.js");
var r  = require("./routes/add_reklam.js");
var admin  = require("./routes/add_admin.js")
var logins = require("./routes/login")

const routes = require('./routes/rout/users');
const auth = require('./routes/rout/auth'); 
const Product = require('./routes/rout/posts/postProduct'); 
const reklamcrud = require('./routes/rout/reklam'); 
const doc = require('./routes/rout/doc'); 
const brand = require('./routes/rout/brand'); 
const filtertype = require('./routes/rout/filtertype'); 

////////////// CONTROLS /////////////
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createUser
} = require( "./controllers/user.js")

const { login, register } = require( "./controllers/auth.js")

var app = express();
app.set("port", process.env.PORT || 5000  );
app.set("view engine","ejs");
app.use(ejsLayouts);
app.set("views","./views");
app.use(express.static(__dirname+"/public"));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cookieParser());
  
  const { verifyToken } = require('./utils/verifyToken')
  
  const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "PNG" || "SVG" || "WebP" || "JPG" || "JPEG") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
 
 const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  })

//////////// FOR UPLOAD ////////////////

////////////  ALL ROUTES //////////////////
app.get("/",useronline);
app.get("/user",verifyToken, products);
app.get("/customers",verifyToken, customers);
app.get("/orders",verifyToken, orders);
app.get("/adminstrators", verifyToken,adminstrators);
app.get("/delivery_boy",verifyToken ,delivery_boy);
app.get("/reklam",verifyToken, reklam);
app.get("/doctors",verifyToken, doctors);
app.get("/FBrand",verifyToken, FBrand);
app.get("/AAnimals",verifyToken, AAnimal);
app.get("/AFillter",verifyToken, AFillter);
app.get("/add_filtertype",verifyToken, addFbrand);
app.get("/inventory",verifyToken, inventory); 
app.get("/settings",verifyToken, settings);
app.get("/add_animal",verifyToken, addanimal);
app.get("/edit_animal/:id",verifyToken, editanimal);
app.get("/edit_reklam/:id",verifyToken, reklam_edit);
app.get("/add_doc",verifyToken, s);
app.get("/add_reklam",verifyToken, r);
app.get("/add_admin",verifyToken ,admin);
app.get("/add_Fbrand",verifyToken ,addFbrand);
app.get("/login", logins);


/////////// ALL API //////////////
app.use('/api/users', routes);
app.use('/api/user', auth);
app.use('/api/products', Product);
app.use('/api/reklam', reklamcrud);
app.use('/api/doc', doc);
app.use('/api/brand', brand);
app.use('/api/filtertype', filtertype);
app.use('/*', (req, res) => {
  res.send('page not found');
});

//////// ALL POSTS //////////////
const ProductSchema = require('./model/postProduct')
const UserSchema = require('./model/user')
const reklamSchema = require('./model/reklam')
const doctorSchema = require('./model/doc')
const brandSchema = require('./model/brand')
const filtertypeSchema = require('./model/filtertype')


app.post('/api/posts/product', upload.single('myFile'), (req, res) => {
  if (req.cookies.access_token) {
    const newFile = ProductSchema.create({
    image: req.file.filename,
    nameEnglish: req.body.nameEnglish,
    nameSorany: req.body.nameSorany,
    nameBadini: req.body.nameBadini,
    nameTurkish: req.body.nameTurkish,
    nameArabic: req.body.nameArabic,
    discriptionEnglish: req.body.discriptionEnglish,
    discriptionSorany: req.body.discriptionSorany,
    discriptionBadini: req.body.discriptionBadini,
    discriptionTurkish: req.body.discriptionTurkish,
    discriptionArabic: req.body.discriptionArabic,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    stock: req.body.stock,
    catagory: req.body.catagory,
    unity: req.body.unity,
    brand: req.body.brand,
    packegeCount: req.body.packegeCount,
    });
    res.status(200).redirect('/products');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/posts/brand', upload.single('myFile'), (req, res) => {
  if (req.cookies.access_token) {
    const newFile = brandSchema.create({
    image: req.file.filename,
    english: req.body.english,
    sorani: req.body.sorani,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
    });
    res.status(200).redirect('/FBrand');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/filtertypeupdate/:id', upload.single('myFile'),async (req, res) => {
  if (req.cookies.access_token) {
    const newFile = await filtertypeSchema.findByIdAndUpdate({_id : req.params.id},{
    image: req.file.filename,
    english: req.body.english,
    sorani: req.body.sorani,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
  });
    res.status(200).redirect('/aFillter');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/brandupdate/:id', upload.single('myFile'),async (req, res) => {
  if (req.cookies.access_token) {
    const newFile = await brandSchema.findByIdAndUpdate({_id : req.params.id},{
    image: req.file.filename,
    english: req.body.english,
    sorani: req.body.kurdish,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
  });
    res.status(200).redirect('/Fbrand');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/posts/doc', upload.single('myFile'), (req, res) => {
  if (req.cookies.access_token) {
    const newFile = doctorSchema.create({
    image: req.file.filename,
    english: req.body.english,
    kurdish: req.body.kurdish,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
    gender: req.body.gender,
    descriptionenglish: req.body.descriptionenglish,
    descriptionkurdish: req.body.descriptionkurdish,
    descriptionarabic: req.body.descriptionarabic,
    descriptionbadini: req.body.descriptionbadini,
    descriptionturkish: req.body.descriptionturkish,
    location: req.body.location,
    });
    res.status(200).redirect('/doctors');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/posts/filtertype', upload.single('myFile'), (req, res) => {
  if (req.cookies.access_token) {
    const newFile = filtertypeSchema.create({
    image: req.file.filename,
    english: req.body.english,
    sorani: req.body.sorani,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
    });
    res.status(200).redirect('/AFillter');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/posts/reklam', upload.single('myFile'), (req, res) => {
  if (req.cookies.access_token) {
    const newFile = reklamSchema.create({
    image: req.file.filename,
    });
    res.redirect('/reklam')
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});

app.post('/api/update/:id', upload.single('myFile'),async (req, res) => {
  if (req.cookies.access_token) {
    const newFile = await ProductSchema.findByIdAndUpdate({_id : req.params.id},{
    image: req.file.filename,
    nameEnglish: req.body.nameEnglish,
    nameSorany: req.body.nameSorany,
    nameBadini: req.body.nameBadini,
    nameTurkish: req.body.nameTurkish,
    nameArabic: req.body.nameArabic,
    discriptionEnglish: req.body.discriptionEnglish,
    discriptionSorany: req.body.discriptionSorany,
    discriptionBadini: req.body.discriptionBadini,
    discriptionTurkish: req.body.discriptionTurkish,
    discriptionArabic: req.body.discriptionArabic,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    stock: req.body.stock,
    catagory: req.body.catagory,
    unity: req.body.unity,
    brand: req.body.brand,
    packegeCount: req.body.packegeCount,
  });
    res.status(200).redirect('/');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/docupdate/:id', upload.single('myFile'),async (req, res) => {
  if (req.cookies.access_token) {
    const newFile = await doctorSchema.findByIdAndUpdate({_id : req.params.id},{
    image: req.file.filename,
    english: req.body.english,
    kurdish: req.body.kurdish,
    arabic: req.body.arabic,
    turkish: req.body.turkish,
    badini: req.body.badini,
    gender: req.body.gender,
    descriptionenglish: req.body.descriptionenglish,
    descriptionkurdish: req.body.descriptionkurdish,
    descriptionarabic: req.body.descriptionarabic,
    descriptionbadini: req.body.descriptionbadini,
    descriptionturkish: req.body.descriptionturkish,
    location: req.body.location,
  });
    res.status(200).redirect('/doctors');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});
app.post('/api/reklamupdate/:id', upload.single('myFile'),async (req, res) => {
  if (req.cookies.access_token) {
    const newFile = await reklamSchema.findByIdAndUpdate( {_id: req.params.id} ,{
    image: req.file.filename,
  });
    res.status(200).redirect('/reklam');
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});

app.post('/api/posts/admin', (req, res) => {
  if (req.cookies.access_token) {
    const newFile =  UserSchema.create({
    username: req.body.name,
    roll: req.body.roll,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
    });
    res.status(200).json({
      status: "success",
      message: req.body.nameEnglish,
    });
  } else {
    res.status(200).json('need admin')
    fs.unlinkSync('./public/'+req.file.filename)
  }
});


//////  MONGODB ///////////
const mongoose = require('mongoose');
const adddoc = require("./routes/add_doc.js");
const add_doc = require("./routes/add_doc.js");
const edit_reklam = require("./routes/edit_reklam.js");
mongoose.connect(process.env.Mongo)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log('error :' + err.message))


/////////// SERVER /////////////
app.listen(app.get("port"), function(req){
    console.log("Express server listening on port " + app.get("port"));
});