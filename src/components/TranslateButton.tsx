import React, { useState } from 'react';

export default function TranslateButton() {
  const [isUrdu, setIsUrdu] = useState(false);

  const toggleTranslation = () => {
    setIsUrdu(!isUrdu);
    // Hum aik custom event bhejenge taake content badal jaye
    const event = new CustomEvent('translateRobotics', { detail: !isUrdu });
    window.dispatchEvent(event);
  };

  return (
    <button 
      onClick={toggleTranslation}
      style={{
        padding: '10px 20px',
        backgroundColor: '#25c2a0',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px'
      }}>
      {isUrdu ? 'Show in English' : 'Translate to Urdu (اردو)'}
    </button>
  );
}