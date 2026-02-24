const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    progressNotes: { type: String },
    startDate: Date,
    endDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
