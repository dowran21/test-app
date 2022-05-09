const express = require('express');
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { VerifyAdminRefreshToken, VerifyAdminAccessToken } = require('../middleware/AuthMiddleware');

router.post("/login", AdminController.Login)
router.get("/load", VerifyAdminRefreshToken, AdminController.AdminLoad)
router.post('/update-post/:id', VerifyAdminAccessToken, AdminController.UpdatePost)
router.post('/submit-post/:id', VerifyAdminAccessToken, AdminController.SubmitToDo)

module.exports = router