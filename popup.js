document.getElementById('fetch').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  
    setTimeout(() => {
      chrome.storage.local.get(['pageHTML'], (result) => {
        document.getElementById('output').textContent = result.pageHTML || 'No content fetched.';
      });
    }, 1000);
});
