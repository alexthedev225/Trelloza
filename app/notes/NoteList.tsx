import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface Note {
  _id: string;
  content: string;
  category: string;

}

interface NoteListProps {
  notes: Note[];
  viewMode: "list" | "grid";
  handleDeleteNote: (_id: string) => void;
  openEditModal: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  viewMode,
  handleDeleteNote,
  openEditModal,
}) => {
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-3 gap-4" : ""}>
      {notes.map((note) => (
        <div
          key={note._id}
          className={`note-${note._id} p-4 bg-gray-100 rounded-lg shadow-lg mb-4 flex flex-col justify-between ${
            viewMode === "grid" ? "h-40" : ""
          }`}
        >
          <div>
            <p className="text-gray-800 text-lg font-semibold">{note.content}</p>
            <p className="text-gray-600 text-sm mt-1">Catégorie: {note.category}</p>
           
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="p-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-600"
              onClick={() => openEditModal(note)}
              title="Modifier la note"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-600"
              onClick={() => handleDeleteNote(note._id)}
              title="Supprimer la note"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
