const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  notes: String,
  listId: String,
  notification: { type: Boolean, default: false },
  referrals: { type: Number, default: 0 },
  responded: { type: [String], default: [] },
  created: { type: Date, default: Date.now }
});

mongoose.model('clients', clientSchema);
