const fs = require('fs')
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

var links = {};
var name_list = [];
var link_list = [];

(async () => {
    var browser, page;
    try {
        console.log("Opening chrome browser");
        browser = await puppeteer.launch({
            headless: true
        });
        console.log("Opened chrome browser");

        console.log("opening new page..");
        page = await browser.newPage();
        console.log("opened new page");
        await page.setDefaultNavigationTimeout(0);

        for (let i = 1; i <= 7; i++) {
            console.log(`opening link ${i}...`);
            await page.goto(`https://www.supercartoons.net/character/24-${i}/tom-jerry.html`);
            console.log("opened link " + i);

            name_list = await page.$$eval("h3[class='caption']", ele => ele.map(el => el.innerText.split(" - ")[1]));
            link_list = await page.$$eval("article[class='cartoon col-md-3'] > a", ele => ele.map(el => el.href));
            for (let i = 0; i < name_list.length; i++) links[name_list[i]] = link_list[i];
        }

        for (const name in links) {
            if (links.hasOwnProperty(name)) {
                console.log(`opening ${name}...`);
                await page.goto(links[name]);
                console.log("opened " + name);

                await page.waitFor("video");
                links[name] = await page.$eval("video", ele => ele.src);
                // console.log(links[name]);
            }
        }

        console.table(links);
        console.log(links.length);

        fs.writeFile('./Tom_&_Jerry/info.json', JSON.stringify(links), function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    } catch (err) {
        console.log("Exception " + err);
    }
    console.log("Closing browser now");
    await browser.close();
}
)();


