const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
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