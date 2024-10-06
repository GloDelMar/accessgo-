import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-full">
    
      <Navbar />
      
     
      <main className="flex flex-col flex-1 w-full max-w-6xl mx-auto p-2 md:space-y-3 items-center">
        {children}
      </main>
     
      <Footer />
    </div>
  );
};

export default Layout;
