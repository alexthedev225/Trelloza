import Link from 'next/link';
import React from 'react';
import { FaTasks, FaCalendarAlt, FaStickyNote, FaCog } from 'react-icons/fa';

export default function HomeMain() {
  return (
    <main className="flex-1 container mx-auto lg:px-40 px-4 py-10 mb-6">
      <section>
        <h2 className="text-white text-4xl font-bold mb-6 underline underline-offset-4 decoration-white playfair-display">
          Explorez vos options rapidement
        </h2>
        <p className="text-lg font-light text-white mb-6">
          Découvrez les outils essentiels pour rester organisé et productif.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Tâches */}
          <Link href="/tasks">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaTasks className="text-5xl mb-4 " />
              <span className="text-2xl font-semibold">Tâches</span>
              <p className="text-sm mt-2 text-white">Organisez vos tâches efficacement</p>
            </div>
          </Link>
          {/* Calendrier */}
          <Link href="/calendar">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaCalendarAlt className="text-5xl mb-4 " />
              <span className="text-2xl font-semibold">Calendrier</span>
              <p className="text-sm mt-2 text-white">Gardez une vue d'ensemble sur vos événements</p>
            </div>
          </Link>
          {/* Notes */}
          <Link href="/notes">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaStickyNote className="text-5xl mb-4 " />
              <span className="text-2xl font-semibold">Notes</span>
              <p className="text-sm mt-2 text-white">Prenez des notes rapidement</p>
            </div>
          </Link>
          {/* Paramètres */}
          <Link href="/settings">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10 text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaCog className="text-5xl mb-4 " />
              <span className="text-2xl font-semibold">Paramètres</span>
              <p className="text-sm mt-2 text-white">Personnalisez vos préférences</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
