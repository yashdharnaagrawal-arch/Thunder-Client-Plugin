const express = require("express");
const router = express.Router();
const {register, login, getUser, updateUser, deleteUser} = require("../controllers/userController")

const verifyToken = require("../middleware/authMiddleware")

router.get("/", verifyToken, getUser)
router.post("/register", register);
router.post("/login", login);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

module.exports = router;