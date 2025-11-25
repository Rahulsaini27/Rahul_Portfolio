import React from 'react';
import { HiOutlineSearch, HiOutlineBell, HiOutlineUserCircle } from 'react-icons/hi';

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center text-gray-400 text-sm">
        <span>Admin</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Portfolio Management</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4ade80] w-64 transition-all"
            />
        </div>
        <div className="relative cursor-pointer">
            <HiOutlineBell className="text-2xl text-gray-400 hover:text-[#4ade80] transition" />
            <span className="absolute top-0 right-0 bg-red-500 border-2 border-white w-3 h-3 rounded-full"></span>
        </div>
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-800">RAHUL</p>
                <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl overflow-hidden border border-gray-200">
               <HiOutlineUserCircle />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;