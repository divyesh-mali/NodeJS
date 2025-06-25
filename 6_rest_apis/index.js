const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

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
app.get('/api/users', (req, res) => {
    // console.log("I'm in get route", req.myUserName);
    res.setHeader('X-MyName', 'Divyesh Mali'); // GOOD PRACTICE :- Always add prefix "X-" to any custom headers you add so that you can differentiate between built in header & custom headers

    // console.log(req.headers);
    return res.json(users);
});

// Rendering HTML with user names
app.get('/users', (req, res) => {
    const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join(' ')}
    </ul>`;

    res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    // If we enter a user ID which is not present then it will return a error status code of 400
    if (!user) return res.status(400).json({error: 'user not found'});
    
    return res.json(user);
})
    // PATCH FUNCTIONALITY IS NOT WORKING OR I'M NOT SURE HOW TO DO IT
    .patch('/api/users/:id', (req, res) => {
        const id = Number(req.params.id);
        const body = req.params.body;

        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({error: 'User not found'});
        }

        // Update the user fields dynamically
        users[userIndex] = {...users[userIndex], ...body};

        // Save to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({error: 'Failed to update user'});
            }
            return res.json({status: 'User updated successfully', user: users[userIndex]});
        });
    })

    .delete('/api/users/:id', (req, res) => {
        const id = Number(req.params.id);

        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({status: 'User Not Found'});
        }

        // Remove user
        users.splice(userIndex, 1);

        // Save to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({status: 'Error deleting user'});
            }
            return res.json({status: 'User Deleted'});
        });
    });

app.post('/api/users', (req, res) => {
    const body = req.body;

    // Due to this condition, we make it mandatory to enter all the fields before making a POST request.
    // If we enter all the fields it will return status: "success" otherwise it will return status code 400
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: 'All fields are required...'});
    }

    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: 'success', id: users.length});
    });
});

app.listen(PORT, () => console.log('Server started'));
