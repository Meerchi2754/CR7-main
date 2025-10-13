const express = require("express");
const { addResource, addMultipleResources, getresource, getAllTopics, getResourcesByTopic } = require("../controller/resourceController");
const router = express.Router();

router.post("/addresource", addResource);
router.post("/bulk", addMultipleResources);
router.post("/getresource", getresource);
router.get("/topics", getAllTopics);
router.get("/topic/:topic", getResourcesByTopic);

module.exports = router;
