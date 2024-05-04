function interactWithSite(wordsToGen, words) {
    console.log('Generating words');
    guess = document.getElementById('guess');
    guess_btn = document.getElementById('guess-btn');

    console.log(wordsToGen);
    words_len = words.length;

    if (wordsToGen > words_len) {
        wordsToGen = words_len;
    }

    for (i = 0; i < wordsToGen; i++) {
        let random = Math.floor(Math.random() * words_len);
        guess.value = words[random];
        guess_btn.click();
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "interactWithSite") {
        interactWithSite(message.value, message.words);
    }
});