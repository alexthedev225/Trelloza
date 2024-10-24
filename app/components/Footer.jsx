import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t-2 text-white p-8 lg:mx-20 mx-8 ">
      <div className="container mx-auto text-center space-y-8">
        {/* Copyright */}
        <p className="text-lg font-semibold tracking-wide">© 2024 Trelloza. Tous droits réservés.</p>
        
        {/* Liens de navigation */}
        <div className="flex justify-center space-x-8 text-sm font-medium">
          <Link href="/privacy">
            <span className="hover:underline cursor-pointer transition-colors duration-300 hover:text-white">Politique de confidentialité</span>
          </Link>
          <Link href="/terms">
            <span className="hover:underline cursor-pointer transition-colors duration-300 hover:text-white">Conditions d'utilisation</span>
          </Link>
          <Link href="/contact">
            <span className="hover:underline cursor-pointer transition-colors duration-300 hover:text-white">Nous contacter</span>
          </Link>
        </div>

        {/* Icônes des réseaux sociaux */}
        <div className="flex justify-center space-x-8 text-2xl">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all duration-300">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all duration-300">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-all duration-300">
            <FaInstagram />
          </a>
        </div>
        
        {/* Message d'équipe */}
        <p className="text-sm text-white">Créé avec ❤️ par l'équipe Trelloza</p>
      </div>
    </footer>
  );
}
