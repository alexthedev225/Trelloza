import { NextResponse } from "next/server";
import Event from "@/app/models/Event"; // Assurez-vous que le modèle est correctement importé
import { connectToDatabase } from "@/app/utils/db";
import jwt from "jsonwebtoken";

// Fonction pour vérifier et décoder le token JWT
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
};

// POST: Créer un nouvel événement
export async function POST(req: Request) {
  await connectToDatabase();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  const { title, startDate, endDate } = await req.json();

  // Validation des champs obligatoires
  if (!title || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Titre, date de début et date de fin sont requis" },
      { status: 400 }
    );
  }

  try {
    const newEvent = new Event({
      title,
      startDate,
      endDate,
      userId: decoded.userId, // Assurez-vous que userId est défini dans votre modèle Event
    });

    await newEvent.save();
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'événement" },
      { status: 500 }
    );
  }
}

// GET: Récupérer les événements de l'utilisateur
export async function GET(req: Request) {
  await connectToDatabase();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  try {
    const events = await Event.find({ userId: decoded.userId }); // Récupérer les événements de l'utilisateur
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}
