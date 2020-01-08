const express = require("express"); //import pakietu express
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Pstats = require("../models/playerstats");


router.get("/", (req, res, next) => {
    Pstats.find().exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => req.status(500).json({ error: err }));

});
router.get("/:pstatsId", (req, res, next) => {
    const id = req.params.pstatsId;
    Pstats.findById(id).exec().then(doc => {
        res.status(200).json(doc)
    }).catch(err => req.status(500).json({ error: err }));

})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
        .then(result => res.status(200).json({
            message: "Usunięcie produktu o nr " + id
        }))
        .catch(err => req.status(500).json({ error: err }));
})


module.exports = router;