import { sendToOpenAI } from './js/openai.js';

let pageContent = '';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {action: "getPageContent"}, function(response) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    if (response && response.content) {
      pageContent = response.content;
      console.log('Page content received:', pageContent.substring(0, 100) + '...');
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendToAI') {
    console.log('Sending to AI. Conversation history length:', request.conversationHistory.length);
    sendToOpenAI(request.conversationHistory)
      .then(response => {
        console.log('AI response received');
        sendResponse({reply: response});
      })
      .catch(error => {
        console.error('AI error:', error);
        sendResponse({reply: 'Error: ' + error.message});
      });
    return true;  // Indicates we want to send a response asynchronously
  }
});