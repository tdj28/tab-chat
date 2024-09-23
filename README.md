# Tab-Chat: AI-Powered Webpage Content Assistant

(experimental and under development, use at your own risk)

Tab-Chat is a Chrome extension that allows you to chat with an AI about the content of the webpage you're currently viewing. It uses OpenAI's GPT-4 model to provide intelligent responses based on the page content.

## Features

- Chat about the content of any webpage
- AI-powered responses using GPT-4
- Markdown support for formatted messages
- Easy-to-use popup interface

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Tab-Chat extension should now appear in your Chrome toolbar.

## Setup

Before using the extension, you need to set up your OpenAI API key:

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Click on the options/settings icon (if available) or right-click the extension icon and select "Options".
3. In the options page, enter your OpenAI API key.
4. Click "Save" to store your API key in Chrome storage, it will not be saved in the cloud or anywhere else. Don't trust me? Good! This is opensource so you can inspect the code.

## Usage

1. Navigate to any webpage you want to chat about.
2. Click the Tab-Chat extension icon in the Chrome toolbar.
3. Type your question or message in the input field and press Enter or click "Send".
4. The AI will respond with information based on the current webpage's content.

## Privacy and Security Warning

⚠️ **IMPORTANT**: This extension sends the entire content of the webpage you're viewing to OpenAI's servers for processing. Please be aware of the following:

1. **Data Transmission**: The extension captures and transmits the text content of the webpage you're viewing to OpenAI's servers.

2. **API Key**: Your OpenAI API key is stored in Chrome's secure storage. However, it's crucial to keep this key private and not share it with others.

3. **Third-Party Processing**: The webpage content and your messages are processed by OpenAI's servers. Make sure you're comfortable with this before using the extension on sensitive pages.

4. **Content Sensitivity**: Avoid using this extension on pages containing personal, confidential, or sensitive information unless you're comfortable with that data being sent to OpenAI.

5. **Usage Costs**: Be aware that using the OpenAI API incurs costs based on your usage. Monitor your usage to avoid unexpected charges.

By using this extension, you acknowledge and accept these privacy and security implications. Use responsibly and at your own risk.

## Contributing

Contributions to improve Tab-Chat are welcome. Please feel free to submit issues or pull requests on the project's GitHub repository.

## License

Apache 2.0
