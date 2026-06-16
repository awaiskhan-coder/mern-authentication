const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userControllers");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/profile", authMiddleware, userController.updateProfile);

router.put("/change-password", authMiddleware, userController.changePassword);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  });
});
module.exports = router;
