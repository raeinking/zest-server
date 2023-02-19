const User = require( "../model/admin")
const bcrypt = require( "bcryptjs")
const { createError } = require( "../utils/error.js")
const jwt = require( "jsonwebtoken")

const register = async (req, res, next) => {
  try {
    const salt =await bcrypt.genSaltSync(10);
    const hash =await bcrypt.hashSync(req.body.password, salt);

    const newUser =  new User({
      ...req.body,
      password: hash,
    });

    await newUser.save()
    res.redirect("/adminstrators")
  } catch (err) {
    next(err);
  }
};
const Delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect(req.get('referer'));
  } catch (err) {
    res.send('try again')
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user.username, isAdmin: user.isAdmin , password: user.password},
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .redirect('/user')
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.cookie('access_token' , '')
  res.redirect('/')
}

const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
  res.status(301).json('err');
  }
}


module.exports = { Delete,login , register , logout , getUsers }