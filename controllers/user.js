const User = require("../model/user.js");
const bcrypt = require( "bcryptjs")

const createUser = async (req, res, next) => {

  try {
    const newUser = new User({
      ...req.body,
    });

    await newUser.save();

    res.status(200).redirect('/');
  } 
  
  catch (err) {
    res.send('err');
  }
};
const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
  res.status(301).json('err');
  }
}

module.exports = {getUsers,getUser,deleteUser,updateUser,createUser}