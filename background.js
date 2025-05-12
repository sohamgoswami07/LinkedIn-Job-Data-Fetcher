chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.html) {
      chrome.storage.local.set({ pageHTML: message.html });
    }
});
