"use client";

import React, { useState, useEffect } from "react";
import {
  UserIcon,
  LockClosedIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { gsap } from "gsap";

type UserSettings = {
  username: string;
  notificationsEnabled: boolean;
  password: string;
  theme: "light" | "dark";
  language: string;
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    username: "",
    notificationsEnabled: true,
    password: "",
    theme: "light",
    language: "fr", // Par défaut en français
  });
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }

    // Animation d'entrée
    gsap.fromTo(
      ".settings-field",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
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
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      // Logique de suppression du compte
      console.log("Compte supprimé");
      // Vous pouvez ajouter ici une requête pour supprimer le compte sur le backend
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-5xl font-bold text-white text-center">
          Gestionnaire de Paramètres
        </h1>
        <p className="mt-4 text-lg text-white text-center">
          Personnalisez votre expérience en ajustant vos préférences et vos
          notifications.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-6 flex items-center space-x-2 settings-field">
          <UserIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">
            Nom d&apos;utilisateur
          </label>
        </div>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleInputChange}
          placeholder="Nouveau nom d'utilisateur"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
        />

        <div className="mb-6 flex items-center space-x-2 mt-4 settings-field">
          <LockClosedIcon className="w-6 h-6 text-gray-700" />
          <label className="block text-gray-700 font-bold">Mot de passe</label>
        </div>
        <input
          type="password"
          name="password"
          value={settings.password}
          onChange={handleInputChange}
          placeholder="Nouveau mot de passe"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
        />

        <div className="my-6 flex items-center settings-field">
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-bold">
            Activer les notifications
          </label>
        </div>
        <button
          onClick={handleSaveSettings}
          className="mt-6 w-full py-3 bg-pink-500 text-white rounded-full transition-all duration-300 hover:bg-pink-600 flex items-center justify-center space-x-2"
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span>Sauvegarder</span>
        </button>

        {saved && (
          <div className="save-notification mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md text-center">
            Paramètres sauvegardés avec succès !
          </div>
        )}
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Suppression de compte
        </h2>
        <p className="text-gray-600 mb-4">
          Si vous souhaitez supprimer votre compte, cela entraînera la perte de
          toutes vos données. Cette action est irréversible.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="mt-2 w-full py-3 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <TrashIcon className="w-5 h-5" />
          <span>
            {confirmDelete
              ? "Confirmer la suppression"
              : "Supprimer mon compte"}
          </span>
        </button>
        {confirmDelete && (
          <p className="text-red-500 mt-4">
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
