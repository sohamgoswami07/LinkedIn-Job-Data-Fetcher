document.getElementById('fetch').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.jobs && Array.isArray(message.jobs)) {
      const table = document.getElementById('jobTable');
      const tbody = document.getElementById('jobData');
      tbody.innerHTML = ''; // Clear existing rows
  
      message.jobs.forEach(job => {
        const row = document.createElement('tr');
  
        const titleCell = document.createElement('td');
        titleCell.textContent = job.jobTitle;
  
        const companyCell = document.createElement('td');
        companyCell.textContent = job.companyName;
  
        const linkCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = job.hrefValue;
        link.textContent = "View";
        link.target = "_blank";
        linkCell.appendChild(link);
  
        row.appendChild(titleCell);
        row.appendChild(companyCell);
        row.appendChild(linkCell);
        tbody.appendChild(row);
      });
  
      table.style.display = 'table';
    }
  });
  