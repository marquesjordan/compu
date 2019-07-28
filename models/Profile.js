const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  _customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  fullname: { type: String, default: '' },
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  website: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  photo: { type: String, default: '' },
  logo: { type: String, default: '' },
  bio: { type: String, default: '' },
  ig: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  facebook: { type: String, default: '' },
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zip: { type: String, default: '' },
  views: { type: Number, default: 0 },
  promoUrl: { type: String, default: '' },
  created: { type: Date, default: Date.now }
});

mongoose.model('profile', profileSchema);
