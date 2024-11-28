const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Reference to multiple Jobs
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false }
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('User', userSchema);