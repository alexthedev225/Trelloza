// app/models/Task.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// Interface pour définir la structure de Task dans TypeScript
interface ITask extends Document {
  content: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: Date | null;
  userId: Schema.Types.ObjectId; // Référence à l'utilisateur propriétaire de la tâche
}

// Schéma de Task pour MongoDB
const taskSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: { type: Date, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
  },
  { timestamps: true }
);

// Création du modèle Task
const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
