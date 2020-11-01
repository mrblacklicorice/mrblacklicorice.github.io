const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {

  var browser, page, element, text = "", randomWaitTime;

  var args = ["Girish", "girishbdodda@gmail.com", "vijayawada"]

  var isRegularVoting, isFBVerificationRequired;

  if (args.length < 3) {
    console.log("Rerun the program with below syntax");
    console.log("node index.js <your name> <fb username> <fb password>");
    return;
  }

  var votesCount = 0;

  while (true) {

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

      console.log("opening voting page..");
      await page.goto('https://mycutebaby.in/contest/participant/?n=5f4fc92bd0925');
      console.log("opened voting page");

      // await page.screenshot({path: 'screenshots/beforeVoting.png', fullPage: true});

      isRegularVoting = await page.$("#vote_btn.vote-btn").then(res => !!res);

      if (isRegularVoting) {
        console.log("Typing voter name as " + args[0]);
        await page.type('#v.form-control.name_box', args[0], { delay: 20 });
      }
      else {
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

      console.log("Clicking vote button");
      await page.$eval('#vote_btn.vote-btn', elem => elem.click());
      // await page.screenshot({path: 'screenshots/aftervoting.png', fullPage: true});

      console.log("Waiting for 3 seconds for vote output");
      await delay(3000);

      console.log("Waiting completed. Let's see vote response");
      element = await page.$("#vote_msg");
      text = await page.evaluate(element => element.textContent, element);
      console.log("Vote response: " + text)

      if (text.includes("Thank You")) {
        votesCount++;
      }

      console.log("Closing browser now");
      await browser.close();

      console.log("Voted " + votesCount + " votes in this session so far. Thank you for running this program :) ");
    }
    catch (err) {
      console.log("Exception " + err);
    }

    randomWaitTime = Math.floor(Math.random() * 5) + 31;

    for (var i = randomWaitTime; i > 0; i--) {
      console.log("Will try again to vote in " + i + " minute(s)");
      await delay(1000 * 60)
    }
  }

})();


