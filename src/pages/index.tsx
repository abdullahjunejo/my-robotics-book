import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('userEmail');
      setIsLoggedIn(!!user); 
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{background: 'linear-gradient(135deg, #1b1b1d 0%, #1e8e6e 100%)', padding: '100px 0'}}>
      <div className="container">
        <h1 className="hero__title" style={{fontSize: '3.5rem', fontWeight: '800', color: '#ffffff'}}>
          Neural Dynamics Portal
        </h1>
        <p className="hero__subtitle" style={{fontSize: '1.5rem', opacity: '0.9', color: '#ffffff'}}>
          Synthesizing Motion and Intelligence for the Next Generation of Robots 🦾
        </p>
        <div className={styles.buttons} style={{marginTop: '30px'}}>
          {/* ✅ FIXED LINK: Isay /docs/intro par rakha hai, taake slug se match kare */}
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold'}}>
            Read the Book - 5min ⏱️
          </Link>

          {!isLoggedIn && (
            <Link
              className="button button--outline button--secondary button--lg"
              to="/signup"
              style={{marginLeft: '15px', padding: '15px 30px', borderRadius: '8px', border: '2px solid'}}>
              Sign Up For Course 🚀
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// ... baqi sara code (Home function) bilkul wahi rahay ga jo aapne diya hai
export default function Home() {
  const [mainInput, setMainInput] = useState('');
  const [mainResponse, setMainResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMainAsk = async () => {
    if (!mainInput) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8005/ask?question=${mainInput}`);
      const data = await res.json();
      setMainResponse(data.answer);
    } catch (err) {
      setMainResponse("Backend offline hai. Port 8005 check karein.");
    }
    setLoading(false);
  };

  return (
    <Layout
      title="Neural Dynamics | Physical AI Home"
      description="Advanced Research Portal for Humanoid Robotics">
      <HomepageHeader />
      <main>
        {/* Features Section */}
        <section style={{padding: '60px 0'}}>
          <div className="container">
            <div className="row">
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🧠 Embodied Cognition</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>Moving beyond simple LLMs into AI that understands physical space.</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🤖 Kinetic Intelligence</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>Developing algorithms for bipedal stability and precision movements.</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🌐 Industrial Middleware</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>Deep dive into ROS 2 architecture and hardware synchronization.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tutor Chatbot Section */}
        <section style={{padding: '80px 0', textAlign: 'center', background: '#1b1b1d', color: 'white'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', color: '#35caa1'}}>Talk to our AI Tutor</h2>
            <div style={{maxWidth: '800px', margin: '0 auto', border: '1px solid #35caa1', borderRadius: '12px', padding: '30px', background: '#242526'}}>
               {mainResponse && (
                 <div style={{textAlign: 'left', background: '#1b1b1d', padding: '15px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #35caa1'}}>
                   <b>AI:</b> {mainResponse}
                 </div>
               )}
               <div style={{display: 'flex', gap: '10px'}}>
                 <input 
                   type="text" value={mainInput} onChange={(e) => setMainInput(e.target.value)}
                   placeholder="Ask about Physical AI..." 
                   style={{flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #3e3e3e', background: '#1b1b1d', color: 'white'}}
                 />
                 <button onClick={handleMainAsk} style={{padding: '10px 25px', borderRadius: '6px', background: '#35caa1', color: 'black', fontWeight: 'bold'}}>
                   {loading ? '...' : 'Ask'}
                 </button>
               </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}