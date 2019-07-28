const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  _business: { type: Schema.Types.ObjectId, ref: 'Business' },
  googleId: String,
  linkedinId: String,
  email: String,
  name: String,
  password: String,
  subscription: { type: String, default: '' },
  subscriptionId: { type: String, default: '' },
  status: { type: String, default: '' },
  credits: { type: Number, default: 0 },
  stripeCustomerId: { type: String, default: '' },
  twilioNumber: { type: String, default: '' },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: '' },
  _profile: { type: Schema.Types.ObjectId, ref: 'Profile' }
});
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('users', userSchema);
