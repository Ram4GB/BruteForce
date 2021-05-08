const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const cors = require("cors");
const uuid = require("uuid");
var LineByLineReader = require("line-by-line");

app.use(cors());

async function main(value, socket, io) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--incognito"],
        });
        const page = await browser.newPage();

        io.emit("request-to-client-message", {
            message: "Initialize your request...",
        });

        lr = new LineByLineReader("password.txt");
        let arrayPassword;
        arrayPassword = await new Promise((resolve, reject) => {
            let result = [];
            lr.on("error", function (error) {
                console.log(error);
                reject([]);
            });

            lr.on("line", function (line) {
                result.push(line);
            });

            lr.on("end", function () {
                console.log("[DONE] Done read file");
                resolve(result);
            });
        });
        console.log(value);
        let url = value.url.value;
        let usernameSelector = value.username.selector;
        let usernameValue = value.username.value;
        let passwordSelector = value.password.selector;
        let buttonValue = value.button.value;
        let waitForSelector = value.waitForSelector.value;

        io.emit("request-to-client-message", {
            message: "Start checking password...",
        });

        for (let i = 0; i <= arrayPassword.length; i++) {
            await page.goto(url).catch((e) => e);
            await page.type(usernameSelector, usernameValue).catch((e) => e);
            await page.type(passwordSelector, arrayPassword[i]).catch((e) => e);
            await page.click(buttonValue).catch((e) => e);
            await page.waitForSelector(waitForSelector).catch((e) => e);
            let element = await page.$(waitForSelector).catch((e) => e);
            let value = await page
                .evaluate((el) => el.textContent, element)
                .catch((e) => e);
            if (value === "Login fail") {
                console.log("[FAIL]", arrayPassword[i]);
                io.emit("request-to-client-password", {
                    password: arrayPassword[i],
                    isCorrect: false,
                    id: uuid.v4(),
                    max: arrayPassword.length,
                    current: i + 1,
                });
            } else if (value === "Login success") {
                console.log("[SUCCESSS]", arrayPassword[i]);
                io.emit("request-to-client-password", {
                    password: arrayPassword[i],
                    isCorrect: true,
                    id: uuid.v4(),
                    max: arrayPassword.length,
                    current: i + 1,
                });
                await page.close();
                await browser.close();
                console.log("[DONE]");
                break;
            } else {
                io.emit("request-to-client-password", {
                    password: arrayPassword[i],
                    isCorrect: false,
                    id: uuid.v4(),
                    max: arrayPassword.length,
                    current: i + 1,
                });
            }
        }

        io.emit("request-to-client-message", {
            message: "Wow, Everything is done ^^",
        });
    } catch (error) {
        console.log(error);
    }
}

function appendString(prefix, number) {
    while ((prefix + number).length < 10) {
        number = "0" + number;
    }
    return prefix + number;
}

io.on("connection", function (socket) {
    console.log("a user connected", new Date().toLocaleTimeString(), socket);
    io.emit("request-to-client-message", {
        message: "Hi from server.",
    });
    socket.on("request-to-server", function (value) {
        main(value, socket, io);
    });
});

server.listen(5000, () => {
    console.log("listening on *:5000");
});
