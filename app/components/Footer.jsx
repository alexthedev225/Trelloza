import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t-2 text-white p-8 px-20">
      <div className="container mx-auto text-center space-y-6">
        <p className="text-lg font-semibold">© 2024 Trelloza. All rights reserved.</p>
        
        <div className="flex justify-center space-x-6">
          <Link href="/privacy">
            <span className="hover:underline cursor-pointer text-sm">Privacy Policy</span>
          </Link>
          <Link href="/terms">
            <span className="hover:underline cursor-pointer text-sm">Terms of Service</span>
          </Link>
          <Link href="/contact">
            <span className="hover:underline cursor-pointer text-sm">Contact Us</span>
          </Link>
        </div>

        <div className="flex justify-center space-x-6 text-2xl">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <FaInstagram />
          </a>
        </div>
        
        <p className="text-xs text-gray-200">Built with ❤️ by Trelloza Team</p>
      </div>
    </footer>
  );
}
