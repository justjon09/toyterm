import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Lagging Logic Terminal v1.0' },
    { type: 'output', text: 'Type \"help\" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: cmd }];

    let output;
    // Hardcode core functional commands
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }
    // Dynamically check against Shopify settings
    else if (customCommands[trimmed]) {
      output = customCommands[trimmed];
    }
    // Dynamically generate the help menu
    else if (trimmed === 'help') {
      const available = Object.keys(customCommands).join(', ');
      output = `Available commands: clear, help, ${available}`;
    }
    // Fallback
    else {
      output = `Command not found: ${trimmed}. Type 'help' for available commands.`;
    }

    setHistory([...newHistory, { type: 'output', text: output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  // Auto-focus on click anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    const terminal = document.querySelector('.terminal-container');
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {history.map((line, i) => (
          <div key={i} className={`line ${line.type}`}>
            {line.type === 'input' ? '$ ' : ''}
            {line.text}
          </div>
        ))}
        <div className="line input-line">
          $ <span className="input-text">{input}</span>
          <span className="cursor">█</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="terminal-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default Terminal;
