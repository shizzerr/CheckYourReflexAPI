const express = require("express"); //import pakietu express
const router = express.Router();
const mongoose = require("mongoose");

const Pstats = require("../models/playerstats");


router.get("/", (req, res, next) => {
    Pstats.find().exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => req.status(500).json({ error: err }));

});
router.post("/", (req, res, next) => {
    const playerstats = new playerStat({
        _id: new mongoose.Types.ObjectId(),
        nickname: req.body.nickname,
        tries: req.body.tries,
        result: req.file.result
    });
    playerStat.save()
        .then(result => {
            res.status(200).json({
                message: "Dodanie statystyk nowego gracza",
                createdplayerStat: playerstats
            });
        })
        .catch(err => req.status(500).json({ error: err }));
});
router.get("/:pstatsId", (req, res, next) => {
    const id = req.params.pstatsId;
    Pstats.findById(id).exec().then(doc => {
        res.status(200).json(doc)
    }).catch(err => req.status(500).json({ error: err }));

})

router.delete("/:pstatsId", (req, res, next) => {
    const id = req.params.pstatsId;
    Product.remove({ _id: id }).exec()
        .then(result => res.status(200).json({
            message: "Usunięcie statystyk gracza o nr " + id
        }))
        .catch(err => req.status(500).json({ error: err }));
})


module.exports = router;