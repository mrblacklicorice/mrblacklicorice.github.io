const fs = require('fs');
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    var browser, page;
    var listOfLinks = [
        "https://www.menuwithprice.com/menu/dark-matter-coffee/",
        "https://www.menuwithprice.com/menu/starbucks/illinois/chicago/122629/",
        "https://www.menuwithprice.com/menu/jamba-juice/illinois/chicago/62813/",
    ];
    var resultsFromLinks = new Array(listOfLinks.length);

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

        for (let i = 0; i < listOfLinks.length; i++) {
            resultsFromLinks[i] = await scrape_data(listOfLinks[i], page);
        }
        console.log("Closing browser now");
        await browser.close();
        for (let i = 0; i < resultsFromLinks.length; i++) {
            fs.writeFile(`./restaurant_data/${resultsFromLinks[i].Name}.json`, JSON.stringify(resultsFromLinks[i]), function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
        }
    } catch (err) {
        console.log("Exception " + err);
    }
}
)();



/**
 * Returns an object with data from the link.
 * @param {String} link 
 * @param {<Page>} page
 */
async function scrape_data(link, page) {
    console.log("opening link...");
    await page.goto(link);
    console.log("opened link");

    // await page.screenshot({ path: './restaurant_data/check.png', fullPage: true });
    var data = await page.evaluate(() => {
        var arr = Array.prototype.slice.call(document.querySelectorAll('div[class= "prices-menu"] > div[class= "price md-price"] > table > tbody > tr'));
        if (arr.length == 0) return [];
        let data_arr = {};
        data_arr.Name = document.querySelector('div[class="prices-menu"]>div[class="menu-tab"]>div[class="menu-tab-l"]>h2').innerText;
        var current = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].className == "prc-th") {
                data_arr[arr[i].innerText] = {};
                current = arr[i].innerText;
            } else if (arr[i].className == "tr") {
                var temp_arr = (arr[i].innerHTML).split("</td>");
                temp_arr.pop();
                for (let i = 0; i < temp_arr.length; i++) {
                    temp_arr[i] = temp_arr[i].split("<td>").pop();
                }
                if (temp_arr[1] == "&nbsp;") temp_arr[1] = "Cost not given";
                if (temp_arr[2] == "") {
                    data_arr[current][temp_arr[0]] = temp_arr[1];
                } else {
                    data_arr[current][temp_arr[0] + `(${temp_arr[2]})`] = temp_arr[1];
                }
            }
        }
        return data_arr;
    });
    if (data.length == 0) data = await page.evaluate(() => {
        var arr = Array.prototype.slice.call(document.querySelectorAll('div[class="prices food-detail-peice"] > table > tbody > tr'))
        if (arr.length == 0) return [];
        let data_arr = {};
        data_arr.Name = document.querySelector('h1').innerText;
        var current = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].className == "prc-th") {
                data_arr[arr[i].innerText] = {};
                current = arr[i].innerText;
            } else if (arr[i].className == "tr") {
                var temp_arr = (arr[i].innerHTML).split("</td>");
                temp_arr.pop();
                for (let i = 0; i < temp_arr.length; i++) {
                    temp_arr[i] = temp_arr[i].split("<td>").pop();
                }
                if (temp_arr[1] == "&nbsp;") temp_arr[1] = "Cost not given";
                if (temp_arr[2] == "") {
                    data_arr[current][temp_arr[0]] = temp_arr[1];
                } else {
                    data_arr[current][temp_arr[0] + `(${temp_arr[2]})`] = temp_arr[1];
                }
            }
        }
        return data_arr;
    });
    if (data.length == 0) return "The link given didn't have the structure needed.";
    return data;
}