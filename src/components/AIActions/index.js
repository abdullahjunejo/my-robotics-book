import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
// 1. SSR safety check ke liye import (Optional but good)
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function AIActions({ chapterTitle }) {
  // 2. Initial state ko simple rakhein
  const [level, setLevel] = useState('beginner');

  // 3. LocalStorage ko sirf browser (Client-side) par load karein
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('userSoftware');
      if (savedLevel) {
        setLevel(savedLevel);
      }
    }
  }, []);

  const handleLevelChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    // 4. Save karte waqt bhi check karein ke window available hai
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSoftware', newLevel);
    }
  };

  const handleTrigger = (mode) => {
    let prompt = "";
    if (mode === 'urdu') {
      prompt = `Please provide a detailed summary of the chapter "${chapterTitle}" in Urdu language.`;
    } else {
      prompt = `I am currently at the ${level} level. Please personalize and explain the main concepts of the chapter "${chapterTitle}" in a way that matches my expertise.`;
    }

    // 5. Window events ke liye check
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('openChat', { detail: prompt });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className={styles.actionContainer}>
      <div className={styles.levelSelector}>
        <label className={styles.label}>My Level: </label>
        <select value={level} onChange={handleLevelChange} className={styles.selectBox}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <button onClick={() => handleTrigger('personalize')} className={styles.personalizeBtn}>
        ✨ Personalize Content
      </button>
      
      <button onClick={() => handleTrigger('urdu')} className={styles.urduBtn}>
        🎯 Urdu Summary
      </button>
    </div>
  );
}