"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";
import Instructions from "./EventTip";

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const WeeklyEventPlanner: React.FC = () => {
  const [events, setEvents] = useState<{
    [key: string]: { title: string; color: string }[];
  }>({});
  const [newEvent, setNewEvent] = useState<{
    [key: string]: { title: string; color: string };
  }>({
    Lundi: { title: "", color: "#000000" },
    Mardi: { title: "", color: "#000000" },
    Mercredi: { title: "", color: "#000000" },
    Jeudi: { title: "", color: "#000000" },
    Vendredi: { title: "", color: "#000000" },
    Samedi: { title: "", color: "#000000" },
    Dimanche: { title: "", color: "#000000" },
  });

  const handleAddEvent = (day: string) => {
    if (!newEvent[day].title) {
      toast.error("Veuillez entrer un titre d'événement !");
      return;
    }

    const updatedEvents = { ...events };
    if (!updatedEvents[day]) {
      updatedEvents[day] = [];
    }
    updatedEvents[day].push({
      title: newEvent[day].title,
      color: newEvent[day].color,
    });
    setEvents(updatedEvents);
    setNewEvent((prev) => ({
      ...prev,
      [day]: { title: "", color: "#000000" },
    }));
    toast.success("Événement ajouté avec succès !");
  };

  const handleDeleteAllEvents = (day: string) => {
    const updatedEvents = { ...events };
    delete updatedEvents[day];
    setEvents(updatedEvents);
    toast.warning(`Tous les événements du ${day} ont été supprimés !`);
  };

  const getTextColor = (bgColor: string): string => {
    // Convertir la couleur hexadécimale en RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculer la luminosité
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness > 186 ? "#000000" : "#FFFFFF"; // Noir pour les fonds clairs, blanc pour les fonds sombres
  };

  return (
    <div className="p-6  min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Planificateur d'Événements Hebdomadaire
      </h1>

      <div className="mb-6 text-center text-white">
        <p>
          Utilisez le planificateur ci-dessous pour organiser vos événements de
          la semaine.
        </p>
      </div>
    <Instructions/>
      <div className="flex flex-wrap justify-between">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className=" bg-white rounded-lg shadow-lg p-4 w-full sm:w-1/7 m-2 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-pink-600 text-center mb-4">
              {day}
            </h2>
            <div className="flex-1 overflow-auto mb-6">
              {events[day]?.map((event, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg mb-3"
                  style={{
                    backgroundColor: event.color,
                    color: getTextColor(event.color),
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Ajouter un événement"
              value={newEvent[day].title}
              onChange={(e) =>
                setNewEvent((prev) => ({
                  ...prev,
                  [day]: { ...prev[day], title: e.target.value },
                }))
              }
              className="border border-pink-300 rounded-lg p-2 w-full mb-2"
              title="Entrez le titre de l'événement."
            />
            <div className="mt-4 text-gray-700">
              Cliquez sur la zone noir pour choisir la couleur de fond de
              l'événement :
            </div>

            <div className="flex my-4  ">
              <div className="relative">
                <input
                  type="color"
                  value={newEvent[day].color}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
                      ...prev,
                      [day]: { ...prev[day], color: e.target.value },
                    }))
                  }
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  title="Cliquez ici pour choisir la couleur de votre événement."
                />
                <div
                  className="w-40 h-10   shadow"
                  style={{ backgroundColor: newEvent[day].color }}
                  title="Cliquez sur la barre ci-dessus pour sélectionner une couleur."
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleAddEvent(day)}
                className="flex items-center bg-pink-500 text-white font-semibold py-1 px-4 rounded-lg hover:bg-pink-600 transition-colors mb-2 mx-1"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Ajouter
              </button>
              <button
                onClick={() => handleDeleteAllEvents(day)}
                className="flex items-center bg-red-500 text-white font-semibold py-1 px-4 rounded-lg hover:bg-red-600 transition-colors mb-2 mx-1"
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                Supprimer tous
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default WeeklyEventPlanner;
