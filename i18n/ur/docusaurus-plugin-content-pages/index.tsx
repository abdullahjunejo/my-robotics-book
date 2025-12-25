import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
      <div className="container" style={{direction: 'rtl'}}>
        <h1 className="hero__title" style={{fontSize: '3.5rem', fontWeight: '800', color: '#ffffff'}}>
          نیورل ڈائنامکس پورٹل 🤖
        </h1>
        <p className="hero__subtitle" style={{fontSize: '1.5rem', opacity: '0.9', color: '#ffffff'}}>
          روبوٹس کی اگلی نسل کے لیے حرکت اور ذہانت کا سنگم
        </p>
        <div className={styles.buttons} style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
          <Link
            className="button button--secondary button--lg"
            to="/ur/docs/intro"
            style={{padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold'}}>
            کتاب پڑھیں - 5 منٹ ⏱️
          </Link>

          {!isLoggedIn && (
            <Link
              className="button button--outline button--secondary button--lg"
              to="/signup"
              style={{padding: '15px 30px', borderRadius: '8px', border: '2px solid'}}>
              کورس کے لیے سائن اپ کریں 🚀
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const [mainInput, setMainInput] = useState('');
  const [mainResponse, setMainResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMainAsk = async () => {
    if (!mainInput) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8005/ask?question=${mainInput}&lang=ur`);
      const data = await res.json();
      setMainResponse(data.answer);
    } catch (err) {
      setMainResponse("بیک اینڈ آف لائن ہے۔ براہ کرم پورٹ 8005 چیک کریں۔");
    }
    setLoading(false);
  };

  return (
    <Layout
      title="ہوم | نیورل ڈائنامکس"
      description="ہیومنائیڈ روبوٹکس کے لیے جدید ریسرچ پورٹل">
      <HomepageHeader />
      <main style={{direction: 'rtl'}}>
        {/* Features Section */}
        <section style={{padding: '60px 0'}}>
          <div className="container">
            <div className="row">
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🧠 مجسم ادراک</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>صرف LLMs سے آگے، ایسی AI جو جسمانی جگہ کو سمجھتی ہے۔</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🤖 حرکی ذہانت</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>دو ٹانگوں والے روبوٹس کے استحکام اور درستگی کے لیے الگورتھم۔</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '20px'}}>
                  <h3 style={{color: 'var(--ifm-color-primary)'}}>🌐 انڈسٹریل مڈل ویئر</h3>
                  <p style={{color: 'var(--ifm-font-color-base)'}}>ROS 2 آرکیٹیکچر اور ہارڈویئر سنکرونائزیشن کی گہرائی۔</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tutor Chatbot Section */}
        <section style={{padding: '80px 0', textAlign: 'center', background: '#1b1b1d', color: 'white'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', color: '#35caa1'}}>ہمارے AI ٹیوٹر سے بات کریں</h2>
            <p style={{fontSize: '1.2rem', opacity: '0.8', marginBottom: '40px'}}>
              فزیکل AI، RTX GPUs، یا روبوٹکس کے بارے میں کچھ بھی پوچھیں۔
            </p>
            <div style={{maxWidth: '800px', margin: '0 auto', border: '1px solid #35caa1', borderRadius: '12px', padding: '30px', background: '#242526'}}>
               <div style={{textAlign: 'right', marginBottom: '15px', color: '#35caa1', fontWeight: 'bold'}}>
                 نیورل اسسٹنٹ 🤖
               </div>

               {mainResponse && (
                 <div style={{
                   textAlign: 'right', 
                   background: '#1b1b1d', 
                   padding: '15px', 
                   borderRadius: '8px', 
                   marginBottom: '15px', 
                   borderLeft: '4px solid #35caa1',
                   fontSize: '14px',
                   lineHeight: '1.6'
                 }}>
                   <b>AI:</b> {mainResponse}
                 </div>
               )}

               <div style={{display: 'flex', gap: '10px'}}>
                 <button 
                   onClick={handleMainAsk}
                   disabled={loading}
                   style={{padding: '10px 25px', borderRadius: '6px', border: 'none', background: '#35caa1', color: 'black', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1}}
                 >
                   {loading ? '...' : 'پوچھیں'}
                 </button>
                 <input 
                   type="text" 
                   value={mainInput}
                   onChange={(e) => setMainInput(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleMainAsk()}
                   placeholder="فزیکل AI کے بارے میں پوچھیں..." 
                   style={{flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #3e3e3e', background: '#1b1b1d', color: 'white', textAlign: 'right'}}
                 />
               </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}