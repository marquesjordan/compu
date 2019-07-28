const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoCodesSchema = new Schema({
  value: String,
  created: { type: Date, default: Date.now },
  expiration: Date
});

mongoose.model('promoCodes', promoCodesSchema);