const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _businessSettings: { type: Schema.Types.ObjectId, ref: 'BusinessSetting' },
  _promoCodes: [{ type: Schema.Types.ObjectId, ref: 'PromoCodes' }],
  name: { type: String, default: '' },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  description: { type: String, default: '' },
  created: { type: Date, default: Date.now }
});

mongoose.model('business', businessSchema);
