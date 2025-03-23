const express = require("express");
const axios = require("axios");
const Game = require('../models/GameModel')
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

    const {rawId, title, platform, coverImageUrl} = req.body
    
    if(! rawId || !title ){
      return res.status(400).json({message:'Faltan campos obligatorios'})
    }

    const newGame = new Game({
      rawId,
      title,
      platform,
      coverImageUrl,
      userId: req.user._id
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    console.error('error al guardar', err.message)
    res.status(500).json({ message: "Error al guardar el juego" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGame = await Game.findOneAndDelete({
      _id: id,
      userId: req.user._id, // asegura que solo elimine sus propios juegos
    });

    if (!deletedGame) {
      return res.status(404).json({ message: "Juego no encontrado o no autorizado" });
    }

    res.status(200).json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego", error: error.message });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedGame = await Game.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Juego no encontrado o no autorizado" });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado", error: error.message });
  }
});


module.exports = router;
