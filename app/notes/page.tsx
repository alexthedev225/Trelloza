"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { gsap } from "gsap";
import NoteForm from "./NoteForm";
import SearchBar from "./SearchBar";
import ViewModeToggle from "./ViewModeToggle";
import NoteList from "./NoteList";
import EditNoteModal from "./EditNoteModal";
import NoteTip from "./NoteTip";

interface Note {
  _id: string;
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

  // Charger les notes depuis l'API
  useEffect(() => {
    const fetchNotes = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.log("Token manquant");
        return; // Optionnel : gérer l'absence de token
      }

      try {
        const response = await fetch("/api/notes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  // Ajouter une note
  const handleAddNote = async () => {
    if (noteContent.trim() === "") {
      alert("Le contenu de la note ne peut pas être vide");
      return;
    }

    const newNote = {
      content: noteContent.trim(),
      category,
      tags: [...tags],
    };

    const token = Cookies.get("token");

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la note");
      }

      const addedNote = await response.json();
      setNotes([addedNote, ...notes]);
      setNoteContent("");
      setCategory("");
      setTags([]);
      setNewTag("");

      // Animation GSAP
      gsap.fromTo(
        `.note-${String(addedNote._id)}`,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'ajout de la note");
    }
  };

  // Supprimer une note
  const handleDeleteNote = async (_id: string) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(`/api/notes/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la note");
      }

      // Animation GSAP pour la suppression de la note
      gsap.to(`.note-${String(_id)}`, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setNotes(notes.filter((note) => note._id !== _id));
        },
      });
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de la suppression de la note");
    }
  };

  // Ouvrir le modal pour éditer une note
  const openEditModal = (note: Note) => {
    setNoteToEdit(note);
    setNoteContent(note.content);
    setCategory(note.category);
    setTags(note.tags);
  };

  // Modifier une note
  const handleEditNote = async () => {
    if (noteToEdit) {
      const token = Cookies.get("token");

      try {
        const response = await fetch(`/api/notes/${noteToEdit._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: noteContent,
            category,
            tags,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la modification de la note");
        }

        const updatedNote = await response.json();

        // Mettre à jour la note dans l'état local
        const updatedNotes = notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        setNotes(updatedNotes);

        // Réinitialiser les champs d'édition
        setNoteToEdit(null);
        setNoteContent("");
        setCategory("");
        setTags([]);
      } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la modification de la note");
      }
    }
  };

  // Filtrer les notes par recherche
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 sm:p-10 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-12 w-full ">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center playfair">
          Gestionnaire de Notes
        </h1>
        <p className="mt-6 text-lg text-white text-center ">
          Organisez vos idées, tâches et informations importantes avec facilité
          grâce à notre gestionnaire de notes intuitif.
        </p>
      </div>
      <NoteTip />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NoteForm
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        category={category}
        setCategory={setCategory}
        tags={tags}
        setTags={setTags}
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddNote={handleAddNote}
      />

      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      <NoteList
        notes={filteredNotes}
        viewMode={viewMode}
        handleDeleteNote={handleDeleteNote}
        openEditModal={openEditModal}
      />

      {noteToEdit && (
        <EditNoteModal
          noteToEdit={noteToEdit}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={() => {
            if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
              setTags([...tags, newTag.trim()]);
              setNewTag("");
            }
          }}
          handleEditNote={handleEditNote}
          setNoteToEdit={setNoteToEdit}
        />
      )}
    </div>
  );
};

export default NotesPage;
