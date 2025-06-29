const express = require("express");
const router = express.Router();
const {handleGetAllUsers, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user")

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router
    .route('/:id')
    .get(handleGetAllUsers)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;