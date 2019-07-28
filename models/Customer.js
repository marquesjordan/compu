const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  count: { type: Number, default: 0 },
  listId: String,
  notification: { type: Boolean, default: false },
  referrals: { type: [String], default: [] },
  created: { type: Date, default: Date.now }
});

mongoose.model('customer', customerSchema);