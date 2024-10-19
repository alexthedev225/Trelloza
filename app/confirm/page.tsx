"use client"
// app/confirm/page.tsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaCheckCircle } from 'react-icons/fa';

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
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default ConfirmPage;
