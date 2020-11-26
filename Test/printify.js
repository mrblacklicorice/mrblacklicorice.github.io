const data = {}; //require document from json
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    var browser, page;
    try {
        console.log("Opening chrome browser");
        browser = await puppeteer.launch({
            headless: false
        });
        console.log("Opened chrome browser");

        console.log("opening new page..");
        page = await browser.newPage();
        console.log("opened new page");
        await page.setDefaultNavigationTimeout(0);

        console.log("opening link...");
        await page.goto('https://printify.com/app/editor/5fbafc7ee1f1eb7d8f1c4a7f/description');
        console.log("opened link");

        // sign-in page

        // Gmail
        await page.waitFor("input[type='email']");
        await page.$eval("input[type='email']", el => el.value = "cflodstrom@gmail.com");

        // Password
        await page.waitFor("input[type='password']");
        await page.$eval("input[type='password']", el => el.value = 'InfinityZer0Shop');

        // Submitting
        await page.click("button[class='loading save']");

        await delay(5000);
        await page.waitFor("button[class='save']");

        await page.screenshot({ path: './Printify/after_log_in.png', fullPage: true });

        // Title
        await page.waitFor("input[name='name']");
        var title = await page.$("input[name='name']");
        await title.click({ clickCount: 3 });
        await title.type("Testing");

        // Description
        await page.waitFor("iframe");
        await page.$eval("iframe", (el) => {
            var doc = el.contentDocument;
            if (doc.querySelector("p") != null) doc.querySelector("p").remove();
            doc.querySelector("div").innerHTML = "TESTING THIS WORKS";
        });

        // Tags
        await page.waitFor("input[name='tag']");
        var tag = await page.$("input[name='tag']");
        await tag.type("Testing Tag")
        await page.keyboard.press('Enter');

        await delay(5000);
        await page.screenshot({ path: './Printify/description.png', fullPage: true });

        await page.click("button[class='save']");

        console.log("Done with Description");
        // Sizes
        await page.waitFor("button[class='save']");
        await delay(5000);

        await page.waitFor("div[class='editor-set-prices']");
        await delay(2000);

        var table = await page.$$("input[name='all-price']");

        for (let i = 0; i < table.length; i++) {
            await table[i].click({ clickCount: 3 });
            await table[i].type("100");
        }

        await delay(5000);
        await page.screenshot({ path: './Printify/variants.png', fullPage: true });

        await page.click("button[class='save']");
        await delay(5000);

        console.log("Done with prices");
        // Saving
        await page.waitFor("button[class='secondary save-as-draft']");
        await page.click("button[class='secondary save-as-draft']");

        await delay(5000);


        console.log("Closing browser now");
        await browser.close();

    } catch (err) {
        console.log("Exception " + err);
    }
}
)();
