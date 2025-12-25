import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hardware, setHardware] = useState('');
  const [software, setSoftware] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match! Please check again.");
      return;
    }

    try {
      setMessage("Connecting to Neon Database...");

      // Requirement #5: Background info local storage mein save karna
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userHardware', hardware);
      localStorage.setItem('userSoftware', software);

      // ✅ FIXED LOGIC: Sara data POST request ke zariye bhej rahe hain
      const response = await fetch(`http://127.0.0.1:8005/signup-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          hardware: hardware,
          software: software
        }),
      });

      if (response.ok) {
        setMessage("✅ Account created & Data saved to Neon!");
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setMessage("❌ Error: Backend could not save to Neon.");
      }

    } catch (err) {
      // Agar backend band hai toh local save show karega
      setMessage("⚠️ Backend connection failed. Data saved locally only.");
    }
  };

  return (
    <Layout title="Sign Up" description="Create your account">
      <div style={{
        padding: '50px', 
        maxWidth: '500px', 
        margin: '50px auto', 
        backgroundColor: '#1b1b1d', 
        borderRadius: '15px', 
        border: '1px solid #25c2a0',
        color: 'white'
      }}>
        <h1 style={{color: '#25c2a0'}}>Sign Up 🚀</h1>
        <p style={{fontSize: '14px', opacity: 0.8}}>Join the Neural Dynamics Portal</p>
        
        <form onSubmit={handleSignup}>
          <div style={{marginBottom: '15px'}}>
            <label>Email Address:</label>
            <input 
              type="email" required
              style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#2d2d30', color: 'white'}} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Hardware Background:</label>
            <select 
              required value={hardware} 
              onChange={(e) => setHardware(e.target.value)}
              style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#2d2d30', color: 'white'}}
            >
              <option value="">Select your hardware</option>
              <option value="rtx">I have an NVIDIA RTX GPU (Sim-ready)</option>
              <option value="cloud">No RTX (I will use Cloud/Jetson)</option>
            </select>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Software Background:</label>
            <select 
              required 
              value={software} 
              onChange={(e) => setSoftware(e.target.value)}
              style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#2d2d30', color: 'white'}}
            >
              <option value="">Select your software level</option>
              <option value="beginner">Beginner (No coding experience)</option>
              <option value="intermediate">Intermediate (Python/C++ knows)</option>
              <option value="expert">Expert (ROS 2 / AI Developer)</option>
            </select>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Set Password:</label>
            <input type="password" required style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#2d2d30', color: 'white'}} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Confirm Password:</label>
            <input type="password" required style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#2d2d30', color: 'white'}} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit" style={{backgroundColor: '#25c2a0', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold'}}>
            Create Account
          </button>
        </form>
        
        {message && (
          <p style={{marginTop: '20px', color: '#25c2a0', textAlign: 'center', fontWeight: 'bold'}}>{message}</p>
        )}
      </div>
    </Layout>
  );
}