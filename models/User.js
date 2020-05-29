const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
  },
  passwordHash: {
      type: String,
      required: true,
  },
})

const UserCollection = mongoose.model('user', userSchema);

module.exports =  Users = {
  getUserByEmail(email) {
    return UserCollection.findOne({ email })
  }
}

 /*const bcrypt = require('bcrypt')
 UserCollection.create({
   email: "test@test.com",
   passwordHash:  bcrypt.hashSync("password", 1)
 }).then(() => console.log("fake user created"))*/