import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faCalendarAlt, faStickyNote, faCog } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function HomeMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Pour éviter le rendu initial côté serveur

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
    setIsLoaded(true); // Marquer que le composant est chargé
  }, []);

  if (!isLoaded) {
    return null; // On peut aussi retourner un spinner de chargement si besoin
  }

  return (
    <main className="flex-1 container mx-auto lg:px-40 px-4 py-10 mb-6">
      <section>
        <h2 className="text-white text-4xl font-bold mb-6 playfair">
          Explorez vos options rapidement
        </h2>

        {/* Message d'instruction moderne */}
        {!isLoggedIn && (
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg flex items-center mb-6">
            <span className="mr-3 text-3xl">⚠️</span>
            <p className="text-lg font-semibold">
              Vous devez être connecté pour accéder à toutes les fonctionnalités ! Veuillez vous connecter pour continuer.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Tâches */}
          {isLoggedIn ? (
            <Link href="/tasks" passHref>
              <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300">
                <FontAwesomeIcon icon={faTasks} className="text-5xl mb-4" />
                <span className="text-2xl font-semibold">Tâches</span>
                <p className="text-sm mt-2 text-white">Organisez vos tâches efficacement</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300 opacity-50">
              <FontAwesomeIcon icon={faTasks} className="text-5xl mb-4" />
              <span className="text-2xl font-semibold">Tâches</span>
              <p className="text-sm mt-2 text-white">Organisez vos tâches efficacement</p>
            </div>
          )}

          {/* Événements */}
          {isLoggedIn ? (
            <Link href="/evenements" passHref>
              <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-5xl mb-4" />
                <span className="text-2xl font-semibold">Événements</span>
                <p className="text-sm mt-2 text-white">Gardez une vue d&apos;ensemble sur vos événements</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300 opacity-50">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-5xl mb-4" />
              <span className="text-2xl font-semibold">Événements</span>
              <p className="text-sm mt-2 text-white">Gardez une vue d&apos;ensemble sur vos événements</p>
            </div>
          )}

          {/* Notes */}
          {isLoggedIn ? (
            <Link href="/notes" passHref>
              <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300">
                <FontAwesomeIcon icon={faStickyNote} className="text-5xl mb-4" />
                <span className="text-2xl font-semibold">Notes</span>
                <p className="text-sm mt-2 text-white">Prenez des notes rapidement</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300 opacity-50">
              <FontAwesomeIcon icon={faStickyNote} className="text-5xl mb-4" />
              <span className="text-2xl font-semibold">Notes</span>
              <p className="text-sm mt-2 text-white">Prenez des notes rapidement</p>
            </div>
          )}

          {/* Paramètres */}
          {isLoggedIn ? (
            <Link href="/settings" passHref>
              <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300">
                <FontAwesomeIcon icon={faCog} className="text-5xl mb-4" />
                <span className="text-2xl font-semibold">Paramètres</span>
                <p className="text-sm mt-2 text-white">Personnalisez vos préférences</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform transition-all duration-300 opacity-50">
              <FontAwesomeIcon icon={faCog} className="text-5xl mb-4" />
              <span className="text-2xl font-semibold">Paramètres</span>
              <p className="text-sm mt-2 text-white">Personnalisez vos préférences</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
