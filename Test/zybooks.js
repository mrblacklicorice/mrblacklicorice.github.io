const puppeteer = require('puppeteer');
var page;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

function waitForScopedSelector(selector, scopeElement) {
    return page.waitForFunction((selector, scopeElement) => scopeElement.querySelector(selector), {}, selector, scopeElement);
}

(async () => {

    var browser, element, text = "", randomWaitTime;

    var login = ["gdodda@wisc.edu", "Vijayawada2004!"];

    var chapter = 10;

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

        console.log("opening signin page");
        await page.goto('https://learn.zybooks.com/signin');
        console.log("opened signin page");

        // await page.screenshot({path: 'screenshots/beforeVoting.png', fullPage: true});

        signin = await page.$("input#ember9").then(res => !!res);

        if (signin) {
            console.log("signing in");
            await page.type('input#ember9', login[0], { delay: 20 });
            await page.type('input#ember11', login[1], { delay: 20 });
            await page.click(".signin-button");
            await page.waitForNavigation();
            console.log("signed in");
        }

        console.log("selcting chapter " + chapter);
        await page.goto(`https://learn.zybooks.com/zybook/WISCCOMPSCI300Fall2022/chapter/${chapter}/section/1`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".nav-text.next");
        console.log("section");

        var nxt = await page.$eval(".nav-text.next", ele => ele.innerText.split(".")[0]);
        console.log(nxt);

        if (nxt == chapter) {
            await page.waitForSelector(".participation");

            var animation = await page.$$(".animation-player-content-resource");
            var x2 = await page.$$(".animation-player-content-resource input");
            var play = await page.$$(".animation-player-content-resource button");

            await page.waitForSelector(".animation-player-content-resource");

            for (let i = 0; i < animation.length; i++) {
                // x2 button
                await page.evaluate((x2) => { x2.click() }, x2[i]);

                // play button
                await page.evaluate((play) => { play.click() }, play[i]);

                await waitForScopedSelector(".animation-player-content-resource .play-button", animation[i]);
                // $$(".animation-player-content-resource .play-button")
            }


            // var types = await page.$$eval(".participation", ele => ele.map(el => el.classList[1]));
            // console.log(types);

            // for (let i = 0; i < elements.length; i++) {
            //     if (types[i] == "animation-player-content-resource") {
            //         // $$(".participation  > div.activity-title-bar .title-bar-chevron").map(ele => ele.classList)





            //     } else if (types[i] == "multiple-choice-content-resource") {

            //     } else if (types[i] == "short-answer-content-resource") {

            //     }
            // }

        }


        if (false) {
            console.log("Regular voting disabled");

            isFBVerificationRequired = await page.$("#verification_vote_btn.verification_vote-btn.vote_fb_btn").then(res => !!res);

            if (isFBVerificationRequired) {
                console.log("It seems FB verification is required!");

                console.log("Clicking verify FB button. It will redirect to FB login page");
                await page.$eval('#verification_vote_btn.verification_vote-btn.vote_fb_btn', elem => elem.click());
                await page.waitForNavigation();

                console.log("Typing FB username and password");

                await page.type('#email', args[1], { delay: 20 })
                await page.type('#pass', args[2], { delay: 20 })

                console.log("Clicking Login button");
                await page.$eval('#loginbutton', elem => elem.click());

                await page.waitForNavigation();
            }
            else {
                console.log("Some error, contact Lokesh");
                return;
            }
        }

        // console.log("Clicking vote button");
        // await page.$eval('#vote_btn.vote-btn', elem => elem.click());
        // // await page.screenshot({path: 'screenshots/aftervoting.png', fullPage: true});

        // console.log("Waiting for 3 seconds for vote output");
        // await delay(3000);

        // console.log("Waiting completed. Let's see vote response");
        // element = await page.$("#vote_msg");
        // text = await page.evaluate(element => element.textContent, element);
        // console.log("Vote response: " + text)

        // if (text.includes("Thank You")) {
        //     votesCount++;
        // }

        // console.log("Closing browser now");
        // await browser.close();

        // console.log("Voted " + votesCount + " votes in this session so far. Thank you for running this program :) ");
    }
    catch (err) {
        console.log("Exception " + err);
    }
})();


