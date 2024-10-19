"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";

// Configure le localisateur avec moment.js
const localizer = momentLocalizer(moment);

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([
    {
      start: new Date(),
      end: new Date(),
      title: "Mon événement",
      color: "bg-blue-500",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });

  const handleSelectSlot = ({ start, end }: any) => {
    setNewEvent({ ...newEvent, start, end });
    setShowForm(true);
  };

  const handleSelectEvent = (event: any) => {
    if (window.confirm(`Voulez-vous supprimer cet événement : "${event.title}" ?`)) {
      setEvents(events.filter((evt) => evt !== event));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title) {
      setEvents([...events, { ...newEvent, color: "bg-green-500" }]);
      setNewEvent({ title: "", start: new Date(), end: new Date() });
      setShowForm(false);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-10 min-h-screen ">
      {/* En-tête */}
      <div className="flex flex-col justify-center items-center mb-12 w-full ">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center playfair-display">Calendrier</h1>
      <p className="mt-6 text-lg text-white text-center ">
          Organisez vos événements et planifiez votre temps efficacement grâce à notre calendrier interactif.
        </p>
      </div>

      {/* Astuce */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 shadow-2xl">
        <p className="text-2xl text-gray-800 flex items-center">
          💡 <strong className="ml-2">Astuce</strong>
        </p>
        <div className="text-gray-700 mt-2">
          <p className="text-lg">
            Pour une meilleure organisation de vos événements, utilisez les fonctionnalités suivantes :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>🔍 <strong>Ajouter :</strong> Cliquez sur une cellule pour créer un nouvel événement.</li>
            <li>🗑️ <strong>Supprimer :</strong> Cliquez sur un événement pour le supprimer.</li>
            <li>✏️ <strong>Modifier :</strong> Vous pouvez ajouter des événements avec un titre spécifique pour les identifier facilement.</li>
          </ul>
        </div>
      </div>

      {/* Formulaire d'ajout d'événement */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ajouter un Événement</h2>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Titre de l'événement"
            className="border rounded-md p-2 mb-2 w-full"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Ajouter
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
<div className="bg-white rounded-lg shadow-lg p-4">
        <Calendar
          localizer={localizer}
          events={events.map((event) => ({ ...event, className: event.color }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          messages={{
            next: "Suivant",
            previous: "Précédent",
            today: "Aujourd'hui",
          }}
          components={{
            event: ({ event }) => (
              <div className={`p-2 rounded-lg shadow-md text-white ${event.color}`}>
                {event.title}
              </div>
            ),
            day: ({ date }) => (
              <div className="text-center p-2 hover:bg-gray-100 transition duration-150 ease-in-out rounded-md">
                {moment(date).format("D")}
              </div>
            ),
            header: ({ label }) => (
              <div className="bg-gray-200 p-2 text-center font-bold text-gray-700 rounded-t-md">
                {label}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;