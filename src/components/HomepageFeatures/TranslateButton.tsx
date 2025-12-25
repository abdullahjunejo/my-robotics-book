import React from 'react';

export default function TranslateButton() {
  const translateToUrdu = () => {
    alert("Urdu translation feature coming soon using AI!"); 
    // Yahan hum OpenAI ki API call lagayen ge baad mein
  };

  return (
    <button onClick={translateToUrdu} style={{backgroundColor: '#2e8555', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px'}}>
      اردو میں پڑھیں (Read in Urdu)
    </button>
  );
}