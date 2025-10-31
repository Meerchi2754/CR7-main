const express = require("express");
const { getUserProfile, updateUserProfile, updatePassword } = require("../controller/profileController");
const router = express.Router();

router.get("/:email", getUserProfile);
router.put("/password/:email", updatePassword);
router.put("/:email", updateUserProfile);

module.exports = router;
