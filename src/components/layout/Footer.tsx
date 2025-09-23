// src/components/layout/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0e1116',
        borderTop: '1px solid #2a2c31',
        padding: '3rem 2rem',
        fontFamily: 'system-ui, sans-serif',
        color: '#d6d2c6',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ minWidth: '200px' }}>
          <img
            src="/images/icons/BTCx_Std_logo.svg"
            alt="BTCx Logo"
            style={{ height: '2rem', marginBottom: '1rem' }}
          />
          <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} BTCx. All rights reserved.
          </p>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.5rem' }}>
            Use at your own risk.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Navigation
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/pools" style={footerLink}>Pools</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/banks" style={footerLink}>Banks</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/bridge" style={footerLink}>Bridge</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/referrals" style={footerLink}>Referrals</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Social
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="https://twitter.com/BTCx" target="_blank" rel="noreferrer" style={footerLink}>
                X (Twitter)
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="https://discord.gg/BTCx" target="_blank" rel="noreferrer" style={footerLink}>
                Discord
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="https://github.com/BTCx" target="_blank" rel="noreferrer" style={footerLink}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.2s',
};

export default Footer;