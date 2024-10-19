"use client";
import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { gsap } from "gsap";

// Type pour une note
interface Note {
  id: number;
  content: string;
  category: string;
  tags: string[];
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  // Charger les notes depuis localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem("Notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Sauvegarder les notes dans localStorage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // Ajouter une nouvelle note
  const handleAddNote = () => {
    if (noteContent.trim() === "") {
      alert("Le contenu de la note ne peut pas être vide");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      content: noteContent.trim(),
      category,
      tags: [...tags],
    };

    setNotes([newNote, ...notes]);
    setNoteContent("");
    setCategory("");
    setTags([]);
    setNewTag("");

    // Animation GSAP
    gsap.fromTo(
      `.note-${newNote.id}`,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  };

  // Supprimer une note
  const handleDeleteNote = (id: number) => {
    gsap.to(`.note-${id}`, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setNotes(notes.filter((note) => note.id !== id));
      },
    });
  };

  // Ouvrir le modal pour éditer une note
  const openEditModal = (note: Note) => {
    setNoteToEdit(note);
    setNoteContent(note.content);
    setCategory(note.category);
    setTags(note.tags);
  };

  // Modifier une note existante
  const handleEditNote = () => {
    if (noteToEdit) {
      const updatedNotes = notes.map((note) =>
        note.id === noteToEdit.id
          ? { ...noteToEdit, content: noteContent, category, tags }
          : note
      );
      setNotes(updatedNotes);
      setNoteToEdit(null);
      setNoteContent("");
      setCategory("");
      setTags([]);
    }
  };

  // Gérer les tags
  const handleAddTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Exporter une note au format texte
  const handleExport = (note: Note) => {
    const blob = new Blob([note.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `note-${note.id}.txt`;
    a.click();
  };

  // Filtrer les notes par recherche
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 sm:p-10 min-h-screen ">
      <div className="flex flex-col justify-center items-center mb-12 w-full ">
  <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center playfair-display">
    Gestionnaire de Notes
  </h1>
  <p className="mt-6 text-lg text-white text-center ">
    Organisez vos idées, tâches et informations importantes avec facilité grâce à notre gestionnaire de notes intuitif.
  </p>
</div>


      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 shadow-2xl">
        <p className="text-2xl text-gray-800 flex items-center">
          💡 <strong className="ml-2">Astuce </strong>
        </p>
        <div className="text-gray-700 mt-2">
          <p className="text-lg text-gray-700 mt-2">
            Pour mieux organiser vos notes, vous pouvez utiliser les fonctionnalités suivantes :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>🔍 <strong>Rechercher :</strong> Utilisez la barre de recherche pour trouver rapidement une note en fonction de son contenu.</li>
            <li>🗂️ <strong>Trier :</strong> Triez vos notes par catégories et tags afin de les organiser efficacement et de filtrer les informations importantes.</li>
            <li>✏️ <strong>Modifier :</strong> Cliquez sur l'icône en forme de crayon pour mettre à jour le contenu d'une note à tout moment.</li>
            <li>🗑️ <strong>Supprimer :</strong> Utilisez l'icône en forme de poubelle pour supprimer les notes dont vous n'avez plus besoin.</li>
            <li>📄 <strong>Exporter :</strong> Vous pouvez exporter une note en cliquant sur l'icône de document pour sauvegarder ou partager son contenu.</li>
          </ul>
        </div>
      </div>

      <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 resize-none"
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Écrivez votre note ici..."
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="font-medium">
              Catégorie:
            </label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-pink-600"
            onClick={handleAddNote}
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Ajouter une Note
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <input
        type="text"
        className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        placeholder="Rechercher une note..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Mode d'affichage (Liste ou Grille) */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition-all"
          onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
        >
          {viewMode === "list" ? (
            <>
              <Squares2X2Icon className="w-5 h-5 mr-2" /> {/* Icône pour l'affichage en grille */}
              <span>Grille</span>
            </>
          ) : (
            <>
              <Bars3Icon className="w-5 h-5 mr-2" /> {/* Icône pour l'affichage en liste */}
              <span>Liste</span>
            </>
          )}
        </button>
      </div>

     {/* Affichage des notes */}
<div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
  {filteredNotes.map((note) => (
    <div
      key={note.id}
      className={`note-${note.id} p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between transition duration-300 transform hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex-1">
        <p className="text-lg font-normal text-gray-800">{note.content}</p>
        <p className="text-md font-medium text-gray-600 mt-1">Catégorie: <span className="font-semibold">{note.category || "Aucune"}</span></p>
        <p className="text-sm text-gray-500 mt-1">Tags: <span className="font-semibold">{note.tags.join(", ") || "Aucun"}</span></p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded-full transition-all duration-300 hover:bg-yellow-600"
          onClick={() => openEditModal(note)}
          aria-label="Modifier la note"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          className="flex items-center justify-center p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600"
          onClick={() => handleDeleteNote(note.id)}
          aria-label="Supprimer la note"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        <button
          className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full transition-all duration-300 hover:bg-green-600"
          onClick={() => handleExport(note)}
          aria-label="Exporter la note"
        >
          <DocumentTextIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Modal d'édition des notes */}
      {noteToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Modifier la note</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="flex mt-2">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ajouter un tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleAddTag}
              >
                Ajouter Tag
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                onClick={handleEditNote}
              >
                Enregistrer
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setNoteToEdit(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
