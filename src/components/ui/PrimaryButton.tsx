// src/components/ui/PrimaryButton.tsx
import React from "react";
import { Link } from "react-router-dom";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, href, onClick }) => {
  const buttonStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#1beaa5',
    color: '#080a0e',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(27, 234, 165, 0.5)',
    transition: 'all 0.3s ease',
    display: 'block',
    margin: '0 auto',
    width: 'fit-content',
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1.05)';
    target.style.boxShadow = '0 0 20px rgba(27, 234, 165, 0.8)';
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.boxShadow = '0 0 15px rgba(27, 234, 165, 0.5)';
  };

  if (href) {
    return (
      <Link
        to={href}
        style={buttonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;