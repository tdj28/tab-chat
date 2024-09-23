const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export async function sendToOpenAI(conversationHistory) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error('API key not set. Please set it in the extension options.');
  }

  const systemMessage = {
    role: 'system',
    content: 'You are a helpful assistant that answers questions about webpage content. Please provide succinct bullet points.'
  };

  // Extract page content from conversation history if it exists
  let pageContent = '';
  const filteredHistory = conversationHistory.filter(msg => {
    if (msg.role === 'system' && msg.content.startsWith('The following is the page content:')) {
      pageContent = msg.content.replace('The following is the page content:', '').trim();
      return false;
    }
    return true;
  });

  // Prepare messages array
  const messages = [
    systemMessage,
    { role: 'system', content: `Page content: ${pageContent}` },
    ...filteredHistory
  ];

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error response:', errorBody);
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('openaiApiKey', function(data) {
      resolve(data.openaiApiKey);
    });
  });
}