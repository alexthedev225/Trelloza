import mongoose from 'mongoose';

const UserSettingsSchema = new mongoose.Schema({
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light',
  },
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    default: 'en',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.UserSettings || mongoose.model('UserSettings', UserSettingsSchema);
