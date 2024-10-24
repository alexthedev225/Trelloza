import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface NoteFormProps {
  noteContent: string;
  setNoteContent: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  handleAddNote: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  noteContent,
  setNoteContent,
  category,
  setCategory,
  handleAddNote,
}) => {
  return (
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
  );
};

export default NoteForm;
