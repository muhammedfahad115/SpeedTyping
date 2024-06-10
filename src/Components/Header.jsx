import { useState, useEffect, useRef, useContext } from 'react';
import dotIcon from '../assets/dotIcon.png';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { MyContext } from '../Context/Context';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { isTyping, setIsTyping } = useContext(MyContext);
  const [blurHeader, setBlurHeader] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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
    const handleLogout = () =>{
      const token = localStorage.getItem('token');
      if(token){
        setShowLogout(true);
      }else{
        setShowLogout(false);
      }
    }
    handleLogout();
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location]);

  useEffect(() => {
    const handleMouseMove = () => {
      setBlurHeader(false);
    };

    if (isTyping) {
      setBlurHeader(true);
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      setBlurHeader(false);
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTyping]);

  useEffect(() => {
    if (isTyping) {
      setBlurHeader(true);
    }
  }, [isTyping]);


  return (
    <>
      <div className={`relative flex justify-between p-6 sm:p-8 duration-500 ${blurHeader ? 'opacity-0' : 'opacity-100'}`}>
        <div className='flex'>
          <h1 className='text-3xl relative z-10 bg-white h-12'>SpeedTyping</h1>
          {showBackButton && <Link to={'/'}><div className='flex mt-1 h-10 items-center p-3 bg-gray-600 dropdown'><p className='text-white font-bold z-0 text-sm'>Click to home</p></div></Link>}
        </div>
        <div className='hidden sm:flex gap-8'>
          <div><Link to={'/about'}><p className='cursor-pointer'>About Us</p></Link></div>
          <div><Link to={'/contact'}><p className='cursor-pointer'>Contact Us</p></Link></div>
          {showLogout ? <div><p className='cursor-pointer'>Logout</p></div> : null   }
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
              <div className='p-2 bg-opacity-0 hover:bg-opacity-100 duration-500 hover:text-white hover:bg-slate-800'><Link to={'/contact'}><p className='cursor-pointer'>Contact Us</p></Link></div>
              {showLogout ? <div className='p-2 bg-opacity-0 hover:bg-opacity-100 duration-500 hover:text-white hover:bg-slate-800'><Link to={'/logout'}><p className='cursor-pointer'>Logout</p></Link></div>: null}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
