const pageHTML = document.documentElement.outerHTML;
const parser = new DOMParser();
const doc = parser.parseFromString(pageHTML, 'text/html');

const jobLinks = doc.querySelectorAll('.job-card-container__link');
const companyDetails = doc.querySelectorAll('.artdeco-entity-lockup__subtitle');

const extractedData = [];

jobLinks.forEach((link, index) => {
  const jobDetails = link.querySelector('span strong');
  const jobTitle = jobDetails ? jobDetails.innerText.trim() : 'N/A';
  const hrefValue = link.href || 'N/A';

  const companyWrapper = companyDetails[index];
  const companySpan = companyWrapper?.querySelector('span');
  const companyName = companySpan ? companySpan.innerText.trim() : 'N/A';

  extractedData.push({
    jobTitle,
    companyName,
    hrefValue
  });
});

chrome.runtime.sendMessage({ jobs: extractedData });
