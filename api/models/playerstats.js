const mongoose = require("mongoose");

const playerstatsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    nickname: String,
    tries: String,
    result: String
});

module.exports = mongoose.model("playerStat", playerstatsSchema);