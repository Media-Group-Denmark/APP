'use client';
import { MoonIcon, SunIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function DarkModeToggle({ onClick }: { onClick: () => void }) {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("dark mode") === "on";
        }
        return false;
      });
    
    
    useEffect(() => {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add('dark');
        localStorage.setItem("dark mode", "on");
      } else {
        root.classList.remove('dark');
        localStorage.setItem("dark mode", "off");
      }
    
    }, [darkMode]);

  return (
    <label htmlFor="darkModeToggle" className="ml-auto mr-4  cursor-pointer">
  <input className='toggle-checkbox' aria-label="darkmodetoggle" id="darkModeToggle" type='checkbox' checked={darkMode} onChange={() => { setDarkMode(!darkMode); onClick() }}></input>
  <div className='toggle-slot'>
    <div className='sun-icon-wrapper'>
      <SunIcon color={'#ffbb52'} className="iconify sun-icon" />
      <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
    </div>
    <div className='toggle-button'></div>
    <div className='moon-icon-wrapper'>
      <MoonIcon className="iconify moon-icon" />
      <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
    </div>
  </div>
</label>
  )
}
