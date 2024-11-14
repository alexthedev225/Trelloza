"use client"; // Assurez-vous d'utiliser les composants de l'état

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ConfirmationPage() {
  useEffect(() => {
    // Animation GSAP
    gsap.fromTo(
      '.confirmation-container',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="confirmation-container bg-white rounded-xl shadow-2xl p-10 max-w-md text-center transform transition duration-300 hover:scale-105">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-24 h-24 text-pink-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-black playfair-display">Compte confirmé avec succès !</h1>
        <p className="mb-6 text-gray-800 text-lg">
          Merci d&apos;avoir confirmé votre compte. Vous pouvez maintenant vous connecter.
        </p>
        <Link href="/auth/login">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            <CheckCircleIcon className="mr-2 h-5 w-5" /> Se connecter
          </div>
        </Link>
        <p className="mt-4 text-gray-500 text-sm">
          Si vous n&apos;avez pas reçu l&apos;email, <Link href="/resend"><span className="text-pink-600 hover:underline">cliquez ici pour renvoyer l&apos;email de confirmation.</span></Link>
        </p>
      </div>
    </div>
  );
}
