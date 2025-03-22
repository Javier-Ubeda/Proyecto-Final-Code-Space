const GameModel = require('../models/GameModel')

const getGames = async (req, res) => {
    try {
        const game = await GameModel.find({userId: req.user._id})
        res.json(game)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los juegos'})
    }
};

const createCollection = async (req, res) => {
    try {

        const {rawId, title, platform, coverImagerUrl} = req.body

        const exist = await GameModel.findOne({
            userId: req.user._id,
            rawId
        })

        if(exist){
            return res.status(400).json({message: "Este juego ya está en tu colección" })
        }

        const newGame = new GameModel({
            rawId,
            title,
            platform,
            coverImagerUrl,
            userId: req.user._id
        });

        await newGame.save()
        res.status(201).json(newGame)
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el juego" });
        console.error("Error al guardar el juego:", error);
        
    }
}

module.exports = { getGames, createCollection }