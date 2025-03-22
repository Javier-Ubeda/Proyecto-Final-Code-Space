const express = require("express");
const axios = require("axios");
const { auth } = require('../middleware/verify-token')

const router = express.Router();

router.get("/platforms", async (req, res) => {
  try {
    const apiKey = process.env.RAWG_KEY;

    const response = await axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error al consultar RAWG:", error.message);
    res.status(500).json({ message: "Error al consultar la API externa" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newGame = new Game({
      ...req.body,
      userId: req.user.id
    });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ message: "Error al guardar el juego" });
  }
});

module.exports = router;
