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
        "https://www.google.com/"
        // "https://www.fastfoodmenuprices.com/dutch-bros-prices/"
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
                    data_arr[current][temp_arr[0] + `{${temp_arr[2]}}`] = temp_arr[1];
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
                    data_arr[current][temp_arr[0] + `{${temp_arr[2]}}`] = temp_arr[1];
                }
            }
        }
        return data_arr;
    });
    if (data.length == 0) data = await page.evaluate(() => {
        var arr = Array.prototype.slice.call(document.querySelectorAll('div[class="section two-column"]'));
        if (arr.length == 0) return [];
        let data_arr = {};
        data_arr.Name = document.querySelector('h1').innerText;
        var current = "";
        var arr_subsection;
        var temp = "";
        var arr_subsection_options;
        var options_arr;
        for (let i = 0; i < arr.length; i++) {
            current = arr[i].querySelector("a").name;
            data_arr[current] = {};
            arr_subsection = Array.prototype.slice.call(arr[i].querySelectorAll('div[class="items"] > div[class="item left"]'));
            for (let j = 0; j < arr_subsection.length; j++) {
                temp = arr_subsection[j].querySelector("h4[class='item-title']").innerText;
                arr_subsection_options = Array.prototype.slice.call(arr_subsection[j].querySelectorAll("li"));
                if (arr_subsection_options.length == 0) {
                    data_arr[current][temp] = arr_subsection[j].querySelector("span[class='price']").innerText
                } else {
                    for (let k = 0; k < arr_subsection_options.length; k++) {
                        options_arr = (arr_subsection_options[k].innerText).split("\n");
                        data_arr[current][`${temp}{${options_arr[0]}}`] = options_arr[1];
                    }
                }
            }
        }
        return data_arr;
    });
    if (data.length == 0) data = await page.evaluate(() => {
        var headers = Array.prototype.slice.call(document.querySelectorAll('table > thead'));
        var bodies = Array.prototype.slice.call(document.querySelectorAll('table > tbody'));
        if (headers.length == 0) return [];
        let data_arr = {};
        var options;
        var temp;
        data_arr.Name = document.querySelector('h1').innerText;
        for (let i = 0; i < headers.length; i++) {
            data_arr[headers[i].innerText.trim()] = {};
            options = Array.prototype.slice.call(bodies[i].children);
            for (let j = 0; j < options.length; j++) {
                temp = (options[j].innerText).split("\n");
                if (temp.length == 3) {
                    data_arr[headers[i].innerText.trim()][`${temp[0]}{${temp[2]}}`] = temp[1];
                } else if (temp.length == 2) {
                    data_arr[headers[i].innerText.trim()][temp[0]] = temp[1];
                }
            }
        }
        return data_arr;
    });
    if (data.length == 0) return "The link given didn't have the structure needed.";
    return data;
}
