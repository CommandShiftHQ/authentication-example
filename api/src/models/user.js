const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    set: password => bcrypt.hashSync(password, 10),
  },
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.statics.findOneOrCreate = function findOneOrCreate(key, data) {
  return this.findOne(key).then((user) => {
    if (user) {
      return user;
    }
    return this.create(data).then((newUser) => {
      return newUser;
    });
  });
}

const User =  mongoose.model('User', userSchema);

module.exports = User;
