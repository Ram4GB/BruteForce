const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
const url = "http://localhost:5000";

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    console.log("Client connect");
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

// dataSeed()

app.listen(port, () => {
    console.log(`Server open port ${port}`);
});

async function dataSeed() {
    let arrayPassword = [
        "aspirine",
        "456654",
        "socrates",
        "photo",
        "parola",
        "nopass",
        "megan",
        "lucy",
        "kenwood",
        "kenny",
        "imagine",
        "forgot",
        "cynthia",
        "blondes",
        "ashton",
        "aezakmi",
        "1234567q",
        "viper1",
        "terry",
        "sabine",
        "redalert",
    ];
    let users = [];
    for (let i = 10; i < 20; i++) {
        users.push(
            axios({
                method: "POST",
                data: {
                    id: "31174100" + i,
                    username: "31174100" + i,
                    password: arrayPassword[i - 10],
                    email: "31174100" + i + "@sgu.edu",
                    phone: "090911133xx",
                    country: "VietNam",
                    district: "Q6",
                    City: "HCM",
                },
                url: `http://localhost:8000/users`,
            })
        );
    }
    await Promise.all(users);
}

module.exports = app;
