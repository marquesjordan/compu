const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
    _customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    _businessSettings: { type: Schema.Types.ObjectId, ref: 'BusinessSetting' },
    _promoCodes: { type: Schema.Types.ObjectId, ref: 'PromoCodes' },
    owner: String,
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    created: { type: Date, default: Date.now },
});

mongoose.model('business', businessSchema);