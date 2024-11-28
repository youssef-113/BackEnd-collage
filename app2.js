const express = require('express');
const app = express();
const Job = require('../models/jobs.model');
const User = require('../models/user.model');

// Create a new user
app.post('/', async (req, res) => {    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a user with their jobs
app.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('jobs');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Update a user
app.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a job for a user
app.post('/', async (req, res) => {
    const { userId, Name, Deadline } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newJob = new Job({ Name, Deadline, user: userId });
        await newJob.save();

        // Add job to user's job list
        user.jobs.push(newJob._id);
        await user.save();

        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get jobs for a user
app.get('/user/:userId', async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.params.userId });
        res.json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = app;

mongoose.set("strictQuery", false)
mongoose
.connect('mongodb://127.0.0.1:27017/lab2db')
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(800, () => console.log('app started on port 800'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})