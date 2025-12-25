import React, { useEffect } from 'react';
import Chatbot from '@site/src/components/Chatbot/Chatbot';
import SelectionButton from '@site/src/components/SelectionButton';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const handleAuthUI = () => {
    const userEmail = localStorage.getItem('userEmail');
    const displayDiv = document.getElementById('user-email-display') as HTMLElement | null;
    const logoutBtn = document.getElementById('logout-link') as HTMLElement | null;
    const separator = document.getElementById('logout-separator') as HTMLElement | null;
    
    if (userEmail && displayDiv && logoutBtn) {
      displayDiv.innerHTML = `👤 ${userEmail}`;
      logoutBtn.style.display = 'block';
      if(separator) separator.style.display = 'block';
      
      logoutBtn.onclick = () => {
        localStorage.removeItem('userEmail');
        window.location.reload();
      };
    } 
    else if (displayDiv && logoutBtn) {
      displayDiv.innerHTML = '';
      logoutBtn.style.display = 'none';
      if(separator) separator.style.display = 'none';
    }
  };

  useEffect(() => {
    handleAuthUI();
    const timer = setTimeout(handleAuthUI, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // ✅ Requirement #2: AI Logic (Alert Khatam, Chatbot Start)
  const handleAskAI = (text: string) => {
    console.log("AI Focus Text:", text);
    
    // LocalStorage se background uthayein
    const softwareLevel = localStorage.getItem('userSoftware') || 'beginner';
    
    // Prompt ko personalize karein
    const personalizedPrompt = `As a ${softwareLevel}, please explain: ${text}`;

    // Custom Event bhejein taake Chatbot khud ko open kare
    const event = new CustomEvent('openChat', { 
      detail: personalizedPrompt 
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      {children}
      {/* Selection Button ab alerts nahi dikhayega, seedha Chatbot trigger karega */}
      <SelectionButton onAskAI={handleAskAI} />
      <Chatbot />
    </>
  );
}