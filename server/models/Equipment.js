const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Please select a type'],
        enum: ['Machine', 'Vessel', 'Tank', 'Mixer']
    },
    status: {
        type: String,
        required: [true, 'Please select a status'],
        enum: ['Active', 'Inactive', 'Under Maintenance'],
        default: 'Active'
    },
    lastCleanedDate: {
        type: Date,
        required: [true, 'Please select a date']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipment', equipmentSchema);
