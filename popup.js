let pageContent = '';
let conversationHistory = [];

document.addEventListener('DOMContentLoaded', function() {
  const chatDiv = document.getElementById('chat');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });

  // Get page content when popup opens
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getPageContent"}, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      if (response && response.content) {
        pageContent = response.content;
        appendMessage('Page content received. Length: ' + pageContent.length, 'system');
        conversationHistory.push({role: 'system', content: 'The following is the page content: ' + pageContent});
      }
    });
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      appendMessage(message, 'user');
      conversationHistory.push({role: 'user', content: message});
      
      chrome.runtime.sendMessage({
        action: 'sendToAI', 
        message: message, 
        conversationHistory: conversationHistory
      }, function(response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          appendMessage('Error: Unable to get response', 'system');
        } else if (response && response.reply) {
          appendMessage(response.reply, 'ai');
          conversationHistory.push({role: 'assistant', content: response.reply});
        } else {
          appendMessage('Error: Invalid response', 'system');
        }
      });
      userInput.value = '';
    }
  }

  function appendMessage(message, role) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;
    
    let label = '';
    switch (role) {
      case 'user':
        label = '<strong>You:</strong> ';
        break;
      case 'ai':
        label = '<strong>AI:</strong> ';
        break;
      case 'system':
        label = '<strong>System:</strong> ';
        break;
    }
    
    messageElement.innerHTML = label + marked.parse(message);
    chatDiv.appendChild(messageElement);
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  console.log('Popup script loaded');
});