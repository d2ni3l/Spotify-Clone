import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import {AiOutlineClose} from 'react-icons/ai'
const Sidebar = () => {

  const NavLinks = ({ handleClick }) => (
    <div className='mt-10 '>
      {links.map((link, i) => (
        <NavLink
          className={`flex items-center justify-center my-8 text-sm font-medium text-gray-400 hover:cyan-400`}
          to={link.to}
          onClick={() => {
            handleClick && handleClick();
          }}
          key={i}>
          <link.icon className='h-6 w-6 mr-2' />
          {link.name}
        </NavLink>
      ))}
    </div>
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false)

 

  return (
    <>
      <div className='md:flex hidden  flex-col w-[240px] py-10 px-4 bg-[#191624] '>
        <img src={logo} alt='logo' className='w-full h-14 object-contain' />
        <NavLinks />
      </div>

      <div className='absolute md:hidden block top-6 right-3 z-50' >
      <svg onClick={() => {setMobileMenu(true); console.log('i got clicked :)')}} className="w-6 h-6 mx-2 mr-5 " aria-hidden="true" fill="green" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
      </div>

      
          {
            mobileMenu ? <div className="transition duration-300 z-50 absolute right-0 bg-transparent backdrop-blur-xl border-purple-500 border-l-2 border-b-2 rounded-tl-md rounded-bl-md  w-1/2 h-screen">
            <div className="flex justify-between py-2 mx-5 items-center" onClick={() => {setMobileMenu(false)}}>
            <AiOutlineClose className="text-3xl text-white"/>
            <img className='w-32 p-6' src={logo}  alt="" />
            </div>

            <div onClick={() => {
              setMobileMenu(false)
            }}>
              <NavLinks/>
            </div>
            </div> 
            : null
          }
        

      


      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}>
        <img src={logo} alt='logo' className='w-full h-14 object-contain' />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
