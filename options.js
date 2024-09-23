document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('saveButton');
    const status = document.getElementById('status');
  
    // Load saved API key
    chrome.storage.sync.get('openaiApiKey', function(data) {
      if (data.openaiApiKey) {
        apiKeyInput.value = data.openaiApiKey;
      }
    });
  
    saveButton.addEventListener('click', function() {
      const apiKey = apiKeyInput.value;
      chrome.storage.sync.set({openaiApiKey: apiKey}, function() {
        status.textContent = 'API key saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 3000);
      });
    });
  });
  