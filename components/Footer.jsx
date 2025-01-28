import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-md  text-center p-6">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5 mb-6">
        
      <Link legacyBehavior href='/terminos'>
        <a  className="text-center cursor-pointer hover:font-semibold">Términos y condiciones</a>
      </Link>
      <Link legacyBehavior href='/politica'>
        <a  className="text-center cursor-pointer hover:font-semibold">Política de privacidad</a>
      </Link >
      <Link legacyBehavior href='/equipoaccessgo'>
        <a  className="text-center cursor-pointer hover:font-semibold">Contacto</a>
      </Link>
      </div>
      
      <div className='flex items-center justify-center space-x-5 mb-6'>
        <Link legacyBehavior href="https://www.facebook.com/profile.php?id=100088546064193" passHref>
          <a target="_blank"><img src="/Vector - 0 (1).svg" alt="Logo de Meta" 
              className='w-6 h-6 transition-transform duration-300 hover:scale-110' /></a>
        </Link>
        
        <Link legacyBehavior href="https://www.instagram.com/accessgo4/" passHref>
          <a target="_blank"><img src="/insta.svg" alt="Logo de Instagram" 
              className='w-6 h-6 transition-transform duration-300 hover:scale-110' /></a>
        </Link>
      </div>
      
      <div className='flex items-center justify-center text-sm'>
        © 2024 AccessGo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
