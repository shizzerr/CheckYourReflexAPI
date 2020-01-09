const express = require("express") //import pakietu express
const router = express.Router()
const mongoose = require("mongoose")
const playerStat = require("../models/playerstats")

router.get("/", (req, res, next) => {
    playerStat.find().exec().then(docs => { res.status(200).json(docs) }).catch(err => req.status(500).json({ error: err }))
})
router.post("/", (req, res, next) => {
    const playerstats = new playerStat({
        _id: new mongoose.Types.PlayerId(),
        nickname: req.body.nickname,
        tries: req.body.tries,
        result: req.body.result
    })
    playerstats.save().then(result => { res.status(200).json({ message: "Dodanie statystyk nowego gracza", createdplayerStat: playerstats }); }).catch(err => req.status(500).json({ error: err }))
})
router.get("/:PlayerId", (req, res, next) => {
    const id = req.params.PlayerId
    playerStat.findById(id).exec().then(doc => { res.status(200).json(doc) }).catch(err => req.status(500).json({ error: err }))
})
router.delete("/:PlayerId", (req, res, next) => {
    const id = req.params.PlayerId
    playerStat.remove({ _id: id }).exec().then(result => res.status(200).json({ message: "Usunięcie statystyk gracza o nr " + id })).catch(err => req.status(500).json({ error: err }))
})
module.exports = router