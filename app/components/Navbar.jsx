"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    try {
      Cookies.remove("token"); // Suppression du cookie
      setIsLoggedIn(false); // Mise à jour de l'état de connexion
  
      // Message de confirmation (vous pouvez l'adapter selon vos besoins)
      alert("Vous êtes maintenant déconnecté.");
  
      // Redirection vers la page d'accueil ou une autre page
      window.location.href = "/"; // Remplacez "/" par la page souhaitée
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };
  

  return (
    <nav className="py-4 text-white border-b-2 lg:mx-20 mx-8 bg-opacity-30 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="mt-2 great-vibes text-5xl tracking-wider cursor-pointer transition transform hover:scale-105 hover:text-blue-300">
          Trelloza
        </Link>

        {/* Bouton Menu Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative"
          aria-label="Toggle menu"
        >
          <div className={`h-1 w-8 bg-white mb-1 transition-transform duration-300 ${menuOpen ? "transform rotate-45 translate-y-2" : ""}`} />
          <div className={`h-1 w-8 bg-white mb-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <div className={`h-1 w-8 bg-white transition-transform duration-300 ${menuOpen ? "transform -rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Menu Ouvert */}
        <div className={`${menuOpen ? "block" : "hidden"} lg:flex lg:space-x-8 lg:items-center rounded-lg transition-all duration-300`}>
          <Link href="/" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
            Accueil
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/tasks" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                Tâches
              </Link>
              <Link href="/evenements" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
              Événements
              </Link>
              <Link href="/notes" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                Notes
              </Link>
              <Link href="/settings" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                Paramètres
              </Link>
              <button onClick={handleLogout} className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Connexion
              </Link>
              <Link href="/auth/register" className="flex items-center text-base transition-colors duration-300 hover:text-pink-300 py-2">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
