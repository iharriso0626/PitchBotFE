import React, { ReactNode } from 'react';
import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen overflow-clip bg-[#C1C6C8] max-h-[100%]">
      <Sidebar />
        
          <main className="p-6 h-screen  w-screen">
            {children}
          </main>
        
    </div>
  );
};

export default Layout;