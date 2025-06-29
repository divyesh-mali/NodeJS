const express = require('express');

const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/my-user-database')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true // Ensures that first name is mandatory
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true // Ensures that same email is unique and user cannot register with same email for more than one account
        },
        jobTitle: {
            type: String
        },
        gender: {
            type: String
        }
    },
    {timestamps: true}
);

// Model
const User = mongoose.model('User', userSchema); // Here, 'User' is set as the name of our collection in MongoDB. You can verify it by typing `show collections` in mongo db. It automatically converts it to plural form i.e. 'User' -> 'users'

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware/Plugins -> https://expressjs.com/en/guide/writing-middleware.html
app.use((req, res, next) => {
    console.log('Hello from middleware 1');
    req.myUserName = 'Divyesh.dev';

    fs.appendFile('log.txt', `${Date.now()} : ${req.method} : ${req.ip} : ${req.path}\n`, (err, data) => {
        next();
    });
});

app.use((req, res, next) => {
    console.log('Hello from middleware 2', req.myUserName);
    next();
});

// Routes
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

// Rendering HTML with user names
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `<ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>`;

    res.send(html);
});

app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);

        // If we enter a user ID which is not present then it will return a error status code of 400
        if (!user) return res.status(400).json({error: 'user not found'});

        return res.json(user);
    })

    // Send a patch request from postman on this url below and it will change the lastName to "new-lastName". You can also take user input if you want for that value. 
    // http://localhost:8000/api/users/<user-id>
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: "new-lastName"});
        
        return res.json({status: "Success"});
    })

    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: "Success"});
    });

app.post('/api/', async (req, res) => {
    const body = req.body;

    // Due to this condition, we make it mandatory to enter all the fields before making a POST request.
    // If we enter all the fields it will return status: "success" otherwise it will return status code 400
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: 'All fields are required...'});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });

    console.log('User created:', result);

    return res.status(201).json({msg: 'success'});
});

app.listen(PORT, () => console.log('Server started'));
