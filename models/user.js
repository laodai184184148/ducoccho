const mongoose = require('mongoose');
const ROLE={
  ADMIN:'admin',
  BASIC:'basic'
}
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role:{
    type:String,
    default: ROLE.BASIC
  },
  profile:{
    fullname:String,
    gender:String,
    phonenumber:String,
    des:String
  }
 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;