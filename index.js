const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
const url = "http://localhost:5000";
const requestIp  = require('request-ip')

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(requestIp.mw())

app.get("/", async (req, res) => {
    console.log("Client connect has [IP]", req.clientIp);
    res.render("index", {
        users: [],
    });
});

app.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        let result = await axios({
            url: `http://localhost:8000/users`,
            method: "GET",
            params: {
                username,
                password,
            },
        });

        if (result && result.data.length != 0) {
            res.render("login-success", {
                user: result.data[0],
            });
        } else {
            res.render("login-fail");
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server open port ${port}`);
});

module.exports = app;
