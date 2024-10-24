import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  confirmationToken?: string;
  isConfirmed: boolean;
  tasks: mongoose.Types.ObjectId[]; // Référence à Task
  notes: mongoose.Types.ObjectId[]; // Référence à Note
  calendar: mongoose.Types.ObjectId[]; // Référence à Calendar
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmationToken: { type: String },
  isConfirmed: { type: Boolean, default: false },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Association
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
