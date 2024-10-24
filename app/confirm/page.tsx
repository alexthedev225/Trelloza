"use client"
// app/confirm/page.tsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

const ConfirmPage = () => {
  useEffect(() => {
    gsap.fromTo(
      '.confirmation-message',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
    gsap.fromTo(
      '.confirmation-icon',
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen   text-center">
      <div className="p-8 rounded-lg  confirmation-message play">
        <h1 className="text-4xl font-bold text-white mb-4 playfair-display">Confirmation d'inscription</h1>
        <p className="text-lg text-white mb-2">Votre inscription a été réussie !</p>
        <p className="text-sm text-white mb-4">Un e-mail de confirmation a été envoyé à votre adresse.</p>
        <div className="mt-8 text-center">
  <Link href="/">
    <div className="inline-flex justify-center items-center bg-black text-white md:px-20 px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105">
      <HomeIcon className="h-5 w-5 mr-2" />
      <span>Retour à l'accueil</span>
    </div>
  </Link>
</div>
      </div>
    </div>
  );
};

export default ConfirmPage;
