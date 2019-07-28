const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoCodesSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _business: { type: Schema.Types.ObjectId, ref: 'Business' },
  name: String,
  description: String,
  redemption: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  expiration: Date
});

mongoose.model('promoCodes', promoCodesSchema);
