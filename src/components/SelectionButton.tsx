import React, { useState, useEffect } from 'react';

export default function SelectionButton({ onAskAI }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Button ko cursor ke paas position karna
        setPosition({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 40,
        });
        setSelectedText(text);
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  if (!show) return null;

  return (
    <button
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        backgroundColor: '#25c2a0',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 12px',
        cursor: 'pointer',
        zIndex: 1000,
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
      onClick={() => onAskAI(selectedText)}
    >
      ✨ Ask AI to Explain
    </button>
  );
}