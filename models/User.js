const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    eventAttendance: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, index: true }
});

module.exports = mongoose.model('User', userSchema);

// added the useriD field for indexing purposes 