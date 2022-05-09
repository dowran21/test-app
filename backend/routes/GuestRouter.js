const express = require('express');
const router = express.Router();
const GuestController = require("../controllers/GuestController");

router.post('/add-post', GuestController.AddPost)
router.get("/get-posts", GuestController.GetPosts)

module.exports = router  