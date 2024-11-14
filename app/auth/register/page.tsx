"use client";

import React, { useState, useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  HomeIcon,
} from "@heroicons/react/24/outline"; // Importation des icônes
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'inscription");
      }

      const data = await response.json();
      setSuccess(data.message);
      router.push("/confirm");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Vous pouvez accéder en toute sécurité à error.message
      } else {
        setError("Une erreur inconnue s'est produite"); // Si l'erreur n'est pas une instance de Error
      }
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    gsap.fromTo(
      ".register-field",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-5xl font-bold text-white text-center playfair-display">
          Inscription
        </h1>
        <p className="mt-6 text-lg text-white text-center">
          Créez votre compte pour commencer à utiliser Trelloza.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-6 flex items-center space-x-2 register-field">
          <UserIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">
            Nom d&apos;utilisateur
          </label>
        </div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
          required
        />

        <div className="mb-6 flex items-center space-x-2 mt-4 register-field">
          <EnvelopeIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Email</label>
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
          required
        />

        <div className="mb-6 flex items-center space-x-2 mt-4 register-field">
          <LockClosedIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Mot de passe</label>
        </div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
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
            <span>S&apos;inscrire</span>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

      <div className="mt-4 text-center register-field">
        <Link href="/auth/login">
          <div className="text-white hover:underline">
            Vous avez déjà un compte ? Connectez-vous
          </div>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/">
          <div className="inline-flex justify-center items-center bg-black text-white md:px-20 px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105">
            <HomeIcon className="h-5 w-5 mr-2" />
            <span>Retour à l&apos;accueil</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

RegisterPage.displayName = "RegisterPage";

export default RegisterPage;
