const express = require("express");
const app = express();
const morgan = require("morgan"); // logger
const bodyParser = require("body-parser"); // odbieranie danych w formie json z body
const mongoose = require("mongoose"); // do laczenia z mongodb

//const productRoutes = require("./api/routes/products");

mongoose.connect("mongodb+srv://shop:" + process.env.PASSWD + "@cluster0-dq8rc.mongodb.net/cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use("/products", productRoutes);

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

module.exports = app