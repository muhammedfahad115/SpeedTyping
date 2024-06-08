import { useState, useEffect, useRef } from 'react';
import dotIcon from '../assets/dotIcon.png';
import { Link } from 'react-router-dom';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='relative flex justify-between p-6 sm:p-8'>
        <div>
          <h1 className='text-3xl'>SpeedTyping</h1>
        </div>
        <div className='hidden sm:flex gap-8'>
          <div><Link to={'/about'}><p className='cursor-pointer'>About Us</p></Link></div>
          <div><Link to={'/contact'}><p className='cursor-pointer'>Contact Us</p></Link></div>
          <div><p className='cursor-pointer'>Logout</p></div>
        </div>
        <div className='sm:hidden flex items-center relative'>
          <img
            src={dotIcon}
            alt='Menu'
            className='cursor-pointer w-7 h-7 mt-2.5'
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className={`absolute right-[18px] top-10 w-32 bg-gray-100 border border-gray-300 rounded shadow-lg transition-opacity duration-300 ${
                isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className='p-2 bg-opacity-0 hover:bg-opacity-100 duration-500 hover:text-white hover:bg-slate-800'><Link to={'/about'}><p className='cursor-pointer'>About Us</p></Link></div>
              <div className='p-2 bg-opacity-0 hover:bg-opacity-100 duration-500 hover:text-white hover:bg-slate-800'><Link to={'/contact'} ><p className='cursor-pointer'>Contact Us</p></Link></div>
              <div className='p-2 bg-opacity-0 hover:bg-opacity-100 duration-500 hover:text-white hover:bg-slate-800'><Link to={'/logout'}><p className='cursor-pointer'>Logout</p></Link></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
