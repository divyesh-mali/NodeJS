const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: 'new-lastName'});

    return res.json({status: 'Success'});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
}

async function handleCreateNewUser(req, res) {
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

    return res.status(201).json({msg: 'success', id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};
