import React from 'react';
import ReactDOM from 'react-dom/client';
import Terminal from '../Terminal.jsx';
import '../Terminal.css';

const rootElement = document.getElementById('lagging-terminal-root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Terminal />
    </React.StrictMode>
  );
}
