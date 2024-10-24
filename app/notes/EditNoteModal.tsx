import React from "react";

interface EditNoteModalProps {
  noteToEdit: any;
  noteContent: string;
  setNoteContent: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  handleEditNote: () => void;
  setNoteToEdit: React.Dispatch<React.SetStateAction<any>>;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  noteContent,
  setNoteContent,
  category,
  setCategory,
  handleEditNote,
  setNoteToEdit,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Modifier la note</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 resize-none mb-4"
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-full transition-all hover:bg-pink-600"
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
