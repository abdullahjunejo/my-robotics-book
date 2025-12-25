import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Salam! I am your Neural Assistant.' }]);
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) {
      setIsLoggedIn(true);
      setUserEmail(savedUser);
    }
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, loading]);

  useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true);
      // ✅ AIActions.js ya Selection se aane wala text yahan handle hoga
      if (e.detail) handleSend(e.detail);
    };
    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, []);

  const handleSend = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    // ✅ Requirement #6: User ka level (beginner/expert) uthayein
    const userLevel = localStorage.getItem('userSoftware') || 'beginner';
    
    // ✅ Requirement #2: Selected text uthayein
    const selection = window.getSelection().toString();
    
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput("");
    setLoading(true);

    try {
      // ✅ Combine all requirements into one Smart Prompt
      // 1. Agar selection hai toh us par focus
      // 2. User level ke mutabiq personalization
      // 3. Urdu summary ya context based answering
      let finalPrompt = `User Level: ${userLevel}. `;
      
      if (selection) {
        finalPrompt += `Context: "${selection}". Task: Based ONLY on this context, answer: "${userText}". Then provide extra insights.`;
      } else {
        finalPrompt += `Task: ${userText}`;
      }

      const res = await fetch(`http://127.0.0.1:8005/ask?question=${encodeURIComponent(finalPrompt)}`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Backend Error: Check if main.py is running." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    localStorage.setItem('userEmail', emailValue);
    setIsLoggedIn(true);
    setUserEmail(emailValue);
    window.location.reload();
  };

  return (
    <div className={styles.chatbotContainer}>
      <button className={styles.floatingButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>Neural Dynamics Assistant</div>
          
          {!isLoggedIn ? (
            <div className={styles.loginForm}>
              <form onSubmit={handleLogin}>
                <input name="email" type="email" placeholder="Email" required className={styles.msgInput} style={{marginBottom: '10px'}} />
                <button type="submit" className={styles.sendBtn} style={{width: '100%'}}>Login</button>
              </form>
            </div>
          ) : (
            <>
              <div className={styles.messagesArea}>
                {messages.map((msg, index) => (
                  <div key={index} className={msg.role === 'user' ? styles.userRow : styles.aiRow}>
                    <span className={styles.senderLabel}>
                      {msg.role === 'user' ? `👤 ${userEmail}` : `🤖 Neural Assistant`}
                    </span>
                    <div className={msg.role === 'user' ? styles.userBubble : styles.aiBubble}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className={styles.aiRow}>
                    <span className={styles.senderLabel}>🤖 Neural Assistant</span>
                    <div className={styles.aiBubble} style={{fontStyle: 'italic', opacity: 0.7}}>Thinking...</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className={styles.inputArea}>
                <input 
                  className={styles.msgInput} 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me..."
                />
                <button onClick={() => handleSend()} className={styles.sendBtn}>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;