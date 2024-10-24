import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface pour définir la structure de Note dans TypeScript
interface INote extends Document {
  content: string;
  category: string;
  tags: string[];
  userId: Schema.Types.ObjectId; // Référence à l'utilisateur propriétaire de la note
}

// Schéma de Note pour MongoDB
const noteSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
  },
  { timestamps: true } // Pour enregistrer les dates de création et de modification
);

// Création du modèle Note
const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', noteSchema);

export default Note;
