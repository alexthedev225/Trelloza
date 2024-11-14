"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Instructions from "./EventTip";

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const API_URL = "/api/events";

const WeeklyEventPlanner: React.FC = () => {
  const [events, setEvents] = useState<{ [key: string]: { title: string; color: string }[] }>({});
  const [newEvent, setNewEvent] = useState<{ [key: string]: { title: string; color: string } }>({
    Lundi: { title: "", color: "#000000" },
    Mardi: { title: "", color: "#000000" },
    Mercredi: { title: "", color: "#000000" },
    Jeudi: { title: "", color: "#000000" },
    Vendredi: { title: "", color: "#000000" },
    Samedi: { title: "", color: "#000000" },
    Dimanche: { title: "", color: "#000000" },
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des événements");

        const fetchedEvents = await response.json();
        const organizedEvents = fetchedEvents.reduce((acc: any, event: any) => {
          acc[event.day] = acc[event.day] || [];
          acc[event.day].push({ title: event.title, color: event.color });
          return acc;
        }, {});
        setEvents(organizedEvents);
      } catch (error) {
        toast.error("Erreur lors de la récupération des événements");
      }
    };
    loadEvents();
  }, []);

  const handleAddEvent = async (day: string) => {
    if (!newEvent[day].title) {
      toast.error("Veuillez entrer un titre d'événement !");
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ day, title: newEvent[day].title, color: newEvent[day].color }),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

      const addedEvent = await response.json();
      setEvents((prevEvents) => ({
        ...prevEvents,
        [day]: [...(prevEvents[day] || []), addedEvent],
      }));
      setNewEvent((prev) => ({
        ...prev,
        [day]: { title: "", color: "#000000" },
      }));
      toast.success("Événement ajouté avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'événement");
    }
  };

  const handleDeleteAllEvents = async (day: string) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ day }),
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression des événements");

      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        delete updatedEvents[day];
        return updatedEvents;
      });
      toast.warning(`Tous les événements du ${day} ont été supprimés !`);
    } catch (error) {
      toast.error("Erreur lors de la suppression des événements");
    }
  };

  const getTextColor = (bgColor: string): string => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness > 186 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="p-10 min-h-screen ">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center mb-12 w-full">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center playfair">
        Planificateur d&apos;Événements Hebdomadaire
        </h1>
        <p className="mt-6 text-lg text-white text-center">
        Utilisez le planificateur ci-dessous pour organiser vos événements de la semaine.
        </p>
      </div>
     
      <Instructions />
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <h2 className="text-xl font-semibold text-pink-600 text-center mb-4">{day}</h2>
            <div className="flex-1 overflow-auto mb-6">
              {events[day]?.map((event, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg mb-3 transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: event.color, color: getTextColor(event.color) }}
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
            <div className="mt-4 text-gray-700">Cliquez sur le bouton noir pour choisir la couleur de fond :</div>

            <div className="relative my-4">
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
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md" style={{ backgroundColor: newEvent[day].color }}></div>
            </div>
            <button
              onClick={() => handleAddEvent(day)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition duration-300"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter
            </button>
            <button
              onClick={() => handleDeleteAllEvents(day)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mt-2 transition duration-300"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyEventPlanner;
