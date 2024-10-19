// app/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmationToken: { type: String },
  isConfirmed: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;