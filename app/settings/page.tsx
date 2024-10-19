"use client";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  BellIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { gsap } from "gsap";

interface UserSettings {
  username: string;
  email: string;
  notificationsEnabled: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    username: "",
    email: "",
    notificationsEnabled: true,
  });
  const [saved, setSaved] = useState(false); // Pour la notification de sauvegarde

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSaveSettings = () => {
    setSaved(true);
    gsap.fromTo(
      ".save-notification",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    setTimeout(() => setSaved(false), 3000); // Masque la notification après 3 secondes
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-5xl font-bold text-white text-center playfair-display">
          Paramètres
        </h1>
        <p className="mt-6 text-lg text-white text-center">
          Personnalisez vos préférences pour une expérience adaptée à vos
          besoins.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-6 flex items-center space-x-2">
          <UserIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Nom d'utilisateur</label>
        </div>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
        />

        <div className="mb-6 flex items-center space-x-2 mt-4">
          <EnvelopeIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Email</label>
        </div>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
        />

        <div className="mb-6 mt-4 flex items-center space-x-2">
          <BellIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Activer les Notifications</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onChange={handleCheckboxChange}
            className="mr-2 leading-tight"
          />
          <span className="text-sm text-gray-600">Recevoir des notifications par email</span>
        </div>

        <button
          onClick={handleSaveSettings}
          className="mt-6 w-full py-3 bg-pink-700 text-white rounded-full transition-all duration-300 hover:bg-pink-800 flex justify-center items-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>Sauvegarder les Paramètres</span>
        </button>
      </div>

      {saved && (
        <div className="save-notification fixed bottom-10 right-10 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Paramètres sauvegardés avec succès !
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
