const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSettingsSchema = new Schema({
    owner: String,
    name: String,
    maxReferrals: Number,
    created: { type: Date, default: Date.now },
});

mongoose.model('businessSettings', businessSettingsSchema);