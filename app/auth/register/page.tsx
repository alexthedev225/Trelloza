"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Nouvel état pour le spinner
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Activer le spinner pendant la requête

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'inscription');
      }

      const data = await response.json();
      setSuccess(data.message);
      router.push('/confirm'); // Rediriger vers la page de confirmation
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Désactiver le spinner après la requête
    }
  };

  // Animation GSAP à l'effet de montée et d'apparition des champs de saisie et du bouton
  React.useEffect(() => {
    gsap.fromTo(
      ".register-field",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-pink-600">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 register-field">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-4 register-field">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6 register-field">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-600 text-white rounded-full transition-all duration-300 hover:bg-pink-700 transform hover:scale-105 register-field"
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <div className="mt-4 text-center register-field">
          <Link href="/auth/login">
            <div className="text-pink-700 hover:underline">Already have an account? Log In</div>
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link href="/">
            <div className="flex justify-center items-center bg-black text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105">
              <FaHome className="mr-2" />
              <span>Back to Home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

export default RegisterPage;
