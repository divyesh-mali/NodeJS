const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware/Plugins
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
    console.log("I'm in get route", req.myUserName);
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
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length});
    });
});

app.listen(PORT, () => console.log('Server started'));
