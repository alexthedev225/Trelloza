"use client";

import Link from "next/link";
import { useState } from 'react';
import { FaTasks, FaCalendarAlt, FaStickyNote, FaCog, FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="py-4 text-white border-b-2 px-20 bg-opacity-30 backdrop-blur-md ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-3xl font-bold tracking-wider cursor-pointer transition transform hover:scale-105 hover:text-blue-300">
            Trelloza
          </span>
        </Link>
        <div className="flex space-x-8">
          <Link href="/">
            <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
              <FaHome className="mr-2" /> Home
            </span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/tasks">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaTasks className="mr-2" /> Tasks
                </span>
              </Link>
              <Link href="/calendar">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaCalendarAlt className="mr-2" /> Calendar
                </span>
              </Link>
              <Link href="/notes">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaStickyNote className="mr-2" /> Notes
                </span>
              </Link>
              <Link href="/settings">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaCog className="mr-2" /> Settings
                </span>
              </Link>
              <button onClick={handleLogout} className="flex items-center text-lg transition-colors duration-300 hover:text-pink-300">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaSignInAlt className="mr-2" /> Login
                </span>
              </Link>
              <Link href="/auth/register">
                <span className="flex items-center cursor-pointer text-lg transition-colors duration-300 hover:text-pink-300">
                  <FaUser className="mr-2" /> Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;