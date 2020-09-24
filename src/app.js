const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Muzahid Husain",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Muzahid Husain",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Muzahid Husain",
        helpText: "This is some helpful text",
    });
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address",
        });
    }
    geoCode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            foreCast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 ",
        name: "Muzahid Husain",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Muzahid Husain",
        errorMessage: "Page not found",
    });
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});