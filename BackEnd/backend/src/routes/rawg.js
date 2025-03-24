const express = require("express");
const router = express.Router();

const { getGame, createCollection, deleteCollection, editCollection} = require('../controllers/GameController')
const { auth } = require('../middleware/verify-token')



router.get("/platforms", auth, getGame);

router.post("/", auth, createCollection);

router.delete("/:id", auth, deleteCollection);

router.put("/:id/status", auth, editCollection);


module.exports = router;
