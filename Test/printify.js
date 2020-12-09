const data = require("../Printify/data.json");
console.log(data);
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

// "tags": [
//     "Jiu Jitsu",
//     "Brazilian Jiu Jitsu",
//     "BJJ",
//     "Jits",
//     "Martial Arts",
//     "Cool",
//     "Modern",
//     "Grapple",
//     "Grappling",
//     "Submission",
//     "Moby Dick",
//     "White Whale",
//     "Hunter"
// ]

// SwiftPOD - https://printify.com/app/print-provider/39/products

// Tee - https://printify.com/app/products/12/bellacanvas/unisex-jersey-short-sleeve-tee
// Hoodie no zip - https://printify.com/app/products/77/gildan/unisex-heavy-blend-hooded-sweatshirt
// Longsleeve Tee - https://printify.com/app/products/49/gildan/unisex-heavy-blend-crewneck-sweatshirt

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

        console.log("opening link...");
        await page.goto(data.link);
        console.log("opened link");

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
        await page.focus("input[name='name']");

        // for (let i = 0; i < await page.$eval("input[name='name']", el => el.value.length); i++) {
        //     await page.keyboard.press('Backspace');
        // }

        // await title.click({ clickCount: 3 });
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        await title.type(data.title);

        // Description
        await page.waitFor("iframe");
        await page.$eval("iframe", (el, data) => {
            var doc = el.contentDocument;
            if (doc.querySelector("p") != null) doc.querySelector("p").remove();
            doc.querySelector("div").innerHTML = data.description;
        }, data);

        // Tags
        await page.waitFor("div[class='editor-tags'");
        var curr_tags = await page.$eval("div[class='editor-tags'", (el) => {
            var curr_tags_nodes = el.querySelectorAll("span > span");
            var tags = [];
            for (const item of curr_tags_nodes) tags.push(item.innerText);
            return tags;
        })

        await page.waitFor("input[name='tag']");
        var tag = await page.$("input[name='tag']");
        for (const tag_name of data.tags) {
            if (!curr_tags.includes(tag_name)) {
                await tag.type(tag_name);
                await page.keyboard.press('Enter');
                await delay(100);
            }
        }

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
            await table[i].type(data.price);
        }

        await delay(5000);
        await page.screenshot({ path: './Printify/variants.png', fullPage: true });

        await page.click("button[class='save']");
        await delay(5000);

        console.log("Done with Prices");
        // Saving
        await page.waitFor("button[class='secondary save-as-draft']");
        await page.click("button[class='secondary save-as-draft']");

        await delay(5000);
        console.log("Done with Saving");

        console.log("Closing browser now");
        await browser.close();

    } catch (err) {
        console.log("Exception " + err);
    }
}
)();
