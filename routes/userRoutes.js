const express = require("express");
const router = express.Router();
const {register, login, getUser, updateUser, deleteUser} = require("../controllers/userController")

router.get("/", getUser)
router.post("/register", register);
router.post("/login", login);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

module.exports = router;