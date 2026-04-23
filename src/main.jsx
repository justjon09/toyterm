import React from 'react';
import ReactDOM from 'react-dom/client';
import Terminal from '../Terminal.jsx';
import '../Terminal.css';

const rootElement = document.getElementById('lagging-terminal-root');
if (rootElement) {
  let customCommands = {};

  // Look for the JSON script tag injected by Shopify
  try {
    const scriptTag = document.getElementById('terminal-config-data');
    if (scriptTag) {
      const parsedData = JSON.parse(scriptTag.textContent);
      // Map the array into a clean key-value object
      parsedData.forEach(item => {
        if (item.command) {
          customCommands[item.command.toLowerCase().trim()] = item.response;
        }
      });
    }
  } catch (error) {
    console.error('Failed to parse terminal commands', error);
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* Pass the dynamic commands into the terminal */}
      <Terminal customCommands={customCommands} />
    </React.StrictMode>
  );
}
