// src/components/ui/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";

interface param {
  title: any;
  options: any[];
  asLinks?:boolean
}

const Dropdown: React.FC<param> = ({ title = "Select...", options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (wrapperRef.current && !wrapperRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-black">{title}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            !isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="var(--light-gray-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-3 w-full max-h-60 overflow-y-auto bg-[var(--dark-color)] rounded-md shadow-lg animate-fade-up animate-duration-200"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected="false"
              className="px-4 py-2 hover:bg-[var(--dark-gray-color)]"
            >
              {option.href ? (
                <a
                  href={option.href}
                  className="text-white block w-full"
                  target={option.newTab ? "_blank" : "_self"}
                  rel={option.newTab ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {option.label}
                </a>
              ) : (
                <button
                  className="text-white cursor-default"
                  onClick={() => {
                    setIsOpen(false);
                    option.onClick?.();
                  }}
                >
                  {option.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
