const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema=new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  cpassword: String,
  dname: String,
  github: { 
    username: String,
  }

});

module.exports = mongoose.model('user',UserSchema)