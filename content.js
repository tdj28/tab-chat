chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    sendResponse({content: document.body.innerText});
  }
  return true;  // Indicates that we will send a response asynchronously
});

console.log('Content script loaded');  // Debug log