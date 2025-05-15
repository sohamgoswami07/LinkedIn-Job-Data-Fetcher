document.getElementById('fetch').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the content script
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });

    // Wait for the content script to send the extracted details
    setTimeout(() => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.jobTitle && message.jobId && message.companyName) {
                // Create a table to display the details
                const output = document.getElementById('output');
                output.innerHTML = `
                    <table border="1" style="width: 100%; text-align: left;">
                        <tr>
                            <th>Job Title</th>
                            <td>${message.jobTitle}</td>
                        </tr>
                        <tr>
                            <th>Company Name</th>
                            <td>${message.companyName}</td>
                        </tr>
                        <tr>
                            <th>Job ID</th>
                            <td>${message.hrefValue}</td>
                        </tr>
                    </table>
                `;
            } else {
                document.getElementById('output').textContent = 'Failed to fetch job details.';
            }
        });
    }, 1000);
});