"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 max-h-20xl text-white px-6 py-4 shadow-md">
      <div className="max-w-8xl  mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Police App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/page/about" className="hover:text-gray-400">About</Link>
          <Link href="/page/filecase" className="hover:text-gray-400">File a Case</Link>
          <Link href="/page/trackcase" className="hover:text-gray-400">Track a Case</Link>
          <Link href="/page/login" className="hover:text-gray-400">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2 bg-gray-800 p-4 rounded-lg">
          <Link href="/" className="block py-2 text-white hover:text-gray-400">Home</Link>
          <Link href="/about" className="block py-2 text-white hover:text-gray-400">About</Link>
          <Link href="/filecase" className="block py-2 text-white hover:text-gray-400">File a Case</Link>
          <Link href="/trackcase" className="block py-2 text-white hover:text-gray-400">Track a Case</Link>
          <Link href="/login" className="block py-2 text-white hover:text-gray-400">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
