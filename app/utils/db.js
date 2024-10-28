import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    // Si une connexion est déjà établie, on la réutilise
    return mongoose.connection;
  }

  // Sinon, on se connecte à MongoDB
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connectToDatabase };
