const pageHTML = document.documentElement.outerHTML;

chrome.runtime.sendMessage({ html: pageHTML });
