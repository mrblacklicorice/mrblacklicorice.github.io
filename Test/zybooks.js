const args = process.argv.slice(2); // Get command line arguments, excluding the first two

console.log('Arguments:', args);

var fs = require('fs');

const puppeteer = require('puppeteer');
var page;

var user = (args.length > 0) ? args[0] : "girish"
var inputChapter = (args.length > 1) ? Number(args[1]) : 1
var inputSection = (args.length > 2) ? Number(args[2]) : 1
var isHeadless = (args[3] == "False") ? false : true

var login = JSON.parse(fs.readFileSync(__dirname + "\\login.json", 'utf-8'))[user];
console.log(login);


function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

function waitForScopedSelector(selector, scopeElement) {
    return page.waitForFunction((selector, scopeElement) => scopeElement.querySelector(selector), {}, selector, scopeElement, { timeout: 40000 });
}

(async () => {

    var browser;

    var chapter = inputChapter;

    var section = inputSection;

    try {
        console.log("Opening chrome browser");
        browser = await puppeteer.launch({
            headless: !isHeadless
        });
        console.log("Opened chrome browser");

        console.log("opening new page..");
        page = await browser.newPage();
        console.log("opened new page");

        await page.setDefaultNavigationTimeout(0);

        console.log("opening signin page");
        await page.goto('https://learn.zybooks.com/signin');
        console.log("opened signin page");

        // await page.screenshot({path: 'screenshots/beforeVoting.png', fullPage: true});

        signin = await page.$("input[type=email]").then(res => !!res);

        if (signin) {
            console.log("signing in");
            await page.type('input[type=email]', login[0], { delay: 20 });
            await page.type('input[type=password]', login[1], { delay: 20 });
            await page.click(".signin-button");
            await page.waitForNavigation();
            console.log("signed in");
        }

        console.log("selcting chapter " + chapter);
        console.log("selecting section " + section);
        await page.goto(`https://learn.zybooks.com/zybook/${login[2]}/chapter/${chapter}/section/${section}`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".nav-text.next");

        var nxt = [chapter, section];

        while (nxt[0] == chapter) {
            var nxt = await page.$eval(".nav-text.next", ele => ele.innerText.split("."));
            console.log("Next Section: " + nxt[0] + "." + nxt[1].split(" ")[0]);

            try {
                await page.waitForSelector(".participation");
            } catch (err) {
                console.log("No participation, moving on");
                nxt = await page.$eval(".nav-text.next", ele => ele.innerText.split("."));
                console.log(nxt[0] + "." + nxt[1].split(" ")[0]);

                if (nxt[0] == chapter) {
                    await page.click(".nav-text.next");
                    await page.waitForNavigation();
                }
            }

            var types = await page.$$eval(".participation", ele => ele.map(e => e.classList[1]));
            console.log(types);

            try {
                if (types.includes("multiple-choice-content-resource")) {
                    // multiple choice
                    await page.waitForSelector(".participation.multiple-choice-content-resource");
                    var mC = await page.$$(".participation.multiple-choice-content-resource");

                    for (let i = 0; i < mC.length; i++) {
                        // if (mC[i].$(".large.orange.filled")) break;

                        var mCQ = await mC[i].$$(".question-choices");
                        var big = await mC[i].$$(".question-set-question");

                        for (let j = 0; j < mCQ.length; j++) {
                            mCQ[j].le

                            var options = await mCQ[j].$$("div > input");

                            for (let k = 0; k < options.length; k++) {
                                await page.evaluate((options) => { options.click() }, options[k]);
                                await waitForScopedSelector(".message", big[j]);

                                if (await big[j].$eval(".message", ele => ele.innerText == "Correct")) break;
                            }
                        }

                        await page.waitForSelector(".large.orange.filled", mC[i]);
                        console.log("multiple choice " + i + " completed");
                    }
                }

                if (types.includes("short-answer-content-resource")) {
                    // short answer
                    await page.waitForSelector(".participation.short-answer-content-resource");
                    var sA = await page.$$(".participation.short-answer-content-resource");

                    for (let i = 0; i < sA.length; i++) {
                        // if (sA[i].$(".large.orange.filled")) break;

                        var sAQ = await sA[i].$$(".input");
                        var big = await sA[i].$$(".question-set-question");

                        for (let j = 0; j < sAQ.length; j++) {
                            await sAQ[j].$eval(".show-answer-button", (ele) => { ele.click(); ele.click(); });

                            await waitForScopedSelector(".forfeit-answer", big[j]);
                            var answer = await big[j].$eval(".forfeit-answer", ele => ele.innerHTML);
                            var txt = await sAQ[j].$("textarea");
                            await txt.type(answer, { delay: 20 });

                            await delay(1000);

                            await sAQ[j].$eval("button.raised", (ele) => ele.click());
                        }

                        await delay(1000);
                        await page.waitForSelector(".large.orange.filled", sA[i]);
                        console.log("short answer " + i + " completed");
                    }
                }

                if (types.includes("animation-player-content-resource")) {
                    var ani = await page.$$(".participation.animation-player-content-resource");

                    for (let i = 0; i < ani.length; i++) {
                        // x2 button
                        await ani[i].$eval("input", ele => ele.click());

                        // Play button
                        await ani[i].$eval(".start-button", ele => ele.click());
                        await delay(1000);
                    }


                    async function allRotated() {
                        var done = await page.$$(".play-button.rotate-180")
                        var total = await page.$$(".play-button")
                        var stillGoing = await page.$$(".pause-button")

                        if (stillGoing.length != 0) return false;
                        return total.length == done.length
                    }

                    let allAnimationsComplete = false;

                    while (!allAnimationsComplete) {
                        await page.$$eval(".play-button.bounce", buttons => {
                            buttons.forEach(button => button.click());
                        });

                        await delay(5000);

                        allAnimationsComplete = await allRotated();

                        if (allAnimationsComplete) {
                            console.log("All animations are complete");
                        }
                    }
                }
            } catch (err) {
                console.log("Exception " + err);
            }

            if (nxt[0] == chapter) {
                await page.click(".nav-text.next");
                await page.waitForNavigation();
            }
        }


        console.log("Closing browser now");
        await browser.close();
    } catch (err) {
        console.log("Exception " + err);
    }
})();


