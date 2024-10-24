"use client";

import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon, HomeIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();

      Cookies.set('token', data.token, {
        expires: 24,
        path: '/',
        secure: true,
        sameSite: 'Strict',
        httpOnly: false,
      });

      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".login-field",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="container mx-auto p-10 ">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-5xl font-bold text-white text-center playfair-display">Connexion</h1>
        <p className="mt-6 text-lg text-white text-center">
          Connectez-vous pour accéder à votre compte Trelloza.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-6 flex items-center space-x-2 login-field">
          <EnvelopeIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Email</label>
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
          required
        />

        <div className="mb-6 flex items-center space-x-2 mt-4 login-field">
          <LockClosedIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Mot de passe</label>
        </div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
          required
        />

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-pink-500 text-white rounded-full transition-all duration-300 hover:bg-pink-600 flex justify-center items-center space-x-2"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent"></div>
          ) : (
            <span>Se connecter</span>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-4 text-center login-field">
        <Link href="/auth/register">
          <div className="text-white hover:underline">Vous n'avez pas de compte ? Inscrivez-vous</div>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/">
          <div className="inline-flex justify-center items-center bg-black text-white md:px-20 px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105">
            <HomeIcon className="h-5 w-5 mr-2" />
            <span>Retour à l'accueil</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
