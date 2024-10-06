import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-md  text-center p-6">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5 mb-6">
        <p className="text-center cursor-pointer hover:font-semibold">Términos y condiciones</p>
        <p className="text-center cursor-pointer hover:font-semibold">Política de privacidad</p>
        <p className="text-center cursor-pointer hover:font-semibold">Contacto</p>
      </div>
      
      <div className='flex items-center justify-center space-x-5 mb-6'>
        <Link legacyBehavior href="#" passHref>
          <a target="_blank"><img src="/Vector - 0 (1).svg" alt="Logo de Meta" 
              className='w-6 h-6 transition-transform duration-300 hover:scale-110' /></a>
        </Link>
        
        <Link legacyBehavior href="#" passHref>
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
