const mongoose = require('mongoose');
const { Schema } = mongoose;

const referralSchema = new Schema({
  _client: { type: Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  phone: String,
  email: { type: String, defualt: '' },
  relationship: { type: String, defualt: '' },
  married: { type: Boolean, defualt: false },
  ageRange: { type: Boolean, defualt: false },
  children: { type: Boolean, defualt: false },
  responded: { type: Boolean, defualt: false },
  viewed: { type: [Date], default: [] },
  contacted: { type: Boolean, defualt: false },
  created: { type: Date, default: Date.now }
});

mongoose.model('referrals', referralSchema);
