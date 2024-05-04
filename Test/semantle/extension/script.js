document.getElementById("genbutton").addEventListener("click", () => {
    // Send a message to the content script to interact with the site
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "interactWithSite", value: document.getElementById('generateNum').value, words: words });
    });
});
