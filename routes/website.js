const express = require("express");

const router = express.Router();

// controllers
import { contact } from "../controllers/website";

// APPLY canPost MIDDLEWARE (if role is admin or author)
router.post("/contact", contact);

module.exports = router;
