const express = require("express");
const { addVisitHistory, getHistoryByEmail, deleteHistory } = require("../controller/resourceController");
const router = express.Router();

router.post("/addhistory", addVisitHistory);
router.get("/user/:email", getHistoryByEmail);
router.delete("/:id", deleteHistory);

module.exports = router;
