const express = require("express");
const app = express();
const morgan = require("morgan"); // logger
const bodyParser = require("body-parser"); // odbieranie danych w formie json z body
const mongoose = require("mongoose"); // do laczenia z mongodb

const playersRoutes = require("./api/routes/playersstats");

mongoose.connect("mongodb+srv://check123:check123@cluster0-dq8rc.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/players", playersRoutes);

// obsługa błędów
app.use((req, res, next) => {
    const error = new Error("Nie znaleziono");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;