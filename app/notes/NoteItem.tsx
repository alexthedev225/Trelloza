import React from "react";
import { PencilIcon, TrashIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

interface NoteItemProps {
  note: { _id: string; content: string; category: string; tags: string[] };
  onEdit: (note: any) => void;
  onDelete: (_id: string) => void;
  onExport: (note: any) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete, onExport }) => {
  return (
    <div
      key={note._id}
      className={`note-${note._id} p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between transition duration-300 transform hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex-1">
        <p className="text-lg font-normal text-gray-800">{note.content}</p>
        <p className="text-md font-medium text-gray-600 mt-1">Catégorie: <span className="font-semibold">{note.category || "Aucune"}</span></p>
        <p className="text-sm text-gray-500 mt-1">Tags: <span className="font-semibold">{note.tags.join(", ") || "Aucun"}</span></p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded-full transition-all duration-300 hover:bg-yellow-600"
          onClick={() => onEdit(note)}
          aria-label="Modifier la note"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          className="flex items-center justify-center p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600"
          onClick={() => onDelete(note._id)}
          aria-label="Supprimer la note"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        <button
          className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full transition-all duration-300 hover:bg-green-600"
          onClick={() => onExport(note)}
          aria-label="Exporter la note"
        >
          <DocumentTextIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
