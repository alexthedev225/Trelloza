import React from "react";

interface EditNoteModalProps {
  noteToEdit: any;
  noteContent: string;
  setNoteContent: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  handleAddTag: () => void;
  handleEditNote: () => void;
  setNoteToEdit: React.Dispatch<React.SetStateAction<any>>;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  noteContent,
  setNoteContent,
  category,
  setCategory,
  tags,
  newTag,
  setNewTag,
  handleAddTag,
  handleEditNote,
  setNoteToEdit,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Modifier la note</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 resize-none"
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <div className="flex items-center justify-between mt-3">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Nouveau tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-full transition-all hover:bg-pink-600"
            onClick={handleAddTag}
          >
            Ajouter Tag
          </button>
        </div>
        <div className="mt-4 flex space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full transition-all hover:bg-green-600"
            onClick={handleEditNote}
          >
            Modifier
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-full transition-all hover:bg-gray-600"
            onClick={() => setNoteToEdit(null)}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
