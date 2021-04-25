const puppeteer = require('puppeteer')

async function main() {
    try {
        const browser = await puppeteer.launch({ headless:false })
        const page = await browser.newPage()
        await page.goto("http://localhost:5000/")
        
        await page.type("#username", "admin")
        await page.type("#password", "12345678")
        await page.click('#btnSubmit')
        await page.close()
    } catch (error) {
        console.log(error)
    }
}

main()