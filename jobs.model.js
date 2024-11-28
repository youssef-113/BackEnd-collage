const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
    {
        Name: { type: String, required: true },
        Deadline: { type: TimeRanges, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Job', jobSchema);