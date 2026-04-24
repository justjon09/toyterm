import React, { useState, useRef, useEffect } from 'react';

const Terminal = ({ customCommands = {} }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Lagging Logic Terminal v1.0' },
    { type: 'output', text: 'Type \"help\" for available commands.' },
  ]);
  const [input, setInput] = useState('');

  // New States for Easter Eggs
  const [surpriseCount, setSurpriseCount] = useState(0);
  const [activeEffect, setActiveEffect] = useState('');

  const inputRef = useRef(null);

  // Helper to trigger CSS animations and remove them after they finish
  const triggerEffect = (effectClass, duration) => {
    setActiveEffect(effectClass);
    setTimeout(() => setActiveEffect(''), duration);
  };

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
    else if (trimmed === 'git push') {
      output = 'Pushing to remote... opening in new tab.';
      window.open(window.location.href, '_blank');
    }
    else if (trimmed === 'surprise me') {
      if (surpriseCount === 0) {
        triggerEffect('shake', 500);
        output = 'System unstable. Brace for impact.';
      } else if (surpriseCount === 1) {
        triggerEffect('flash', 1000);
        output = 'Critical power surge detected in the mainframe.';
      } else {
        output = "You've had enough ... some people.";
      }
      setSurpriseCount(prev => prev + 1);
    }
    // Dynamically generate the help menu
    else if (trimmed === 'help') {
      const available = Object.keys(customCommands).join(', ');
      output = `Available commands: clear, surprise me, git push, help, ${available}`;
    }
    // Dynamically check against Shopify settings
    else if (customCommands[trimmed]) {
      output = customCommands[trimmed];
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
        // Add preventScroll: true to stop the browser from jumping
        inputRef.current.focus({ preventScroll: true });
      }
    };
    const terminal = document.querySelector('.terminal-container');
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    // Apply the activeEffect class dynamically to the wrapper
    
    <div className={`terminal-container ${activeEffect}`}>
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
