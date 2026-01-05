import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/icon.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full flex justify-between md:justify-around items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100'>
      {/* LOGO */}
      <div className='flex flex-1 items-center text-2xl md:text-3xl font-medium gap-2'>
        <img src={logo} alt="logo" className='h-8' />
        Rudix
      </div>

      {/* BOUTON BURGER (Mobile uniquement) */}
      <div className='md:hidden'>
        <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* LIENS (Desktop) */}
      <div className='hidden md:flex gap-8 items-center text-sm lg:text-base'>
        <Link to="/" className='hover:text-[#633BBC] transition-colors'>Accueil</Link>
        <Link to="/" className='hover:text-[#633BBC] transition-colors'>Features</Link>
        <Link to="/" className='hover:text-[#633BBC] transition-colors'>A propos</Link>
      </div>

      {/* BOUTONS (Desktop) */}
      <div className='hidden md:flex flex-1 justify-end gap-4 items-center'>
        <a href='/login' className='border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50 transition-all'>
          Se connecter
        </a>
        <a href='/register' className='text-white bg-black rounded-md px-4 py-2 hover:bg-gray-800 transition-all'>
          S'inscrire
        </a>
      </div>

      {/* MENU MOBILE (Slide Down) */}
      <div className={`
        absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 md:hidden z-50 transition-all duration-300 shadow-xl
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}>
        <div className='flex flex-col gap-4 text-lg font-medium'>
          <Link to="/" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link to="/" onClick={() => setIsOpen(false)}>Features</Link>
          <Link to="/" onClick={() => setIsOpen(false)}>A propos</Link>
        </div>
        <hr className='border-gray-100' />
        <div className='flex flex-col gap-3'>
          <Link to='/login' className='text-center border border-gray-200 rounded-md p-3'>Se connecter</Link>
          <Link to='/register' className='text-center text-white bg-black rounded-md p-3'>S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
}