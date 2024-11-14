import { NextRequest, NextResponse } from "next/server";
import Event from "@/app/models/Event";
import { connectToDatabase } from "@/app/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const verifyToken = (token: string): DecodedToken | null => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
    }
    return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    return null;
  }
};

// GET: Récupérer tous les événements de l'utilisateur pour la semaine
export async function GET(req: NextRequest) {
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
    const events = await Event.find({ userId: decoded.userId });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}

// POST: Ajouter un nouvel événement pour un jour spécifique
export async function POST(req: NextRequest) {
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

  const { day, title, color } = await req.json() as {
    day: string;
    title: string;
    color: string;
  };

  if (!day || !title || !color) {
    return NextResponse.json({ error: "Informations manquantes" }, { status: 400 });
  }

  try {
    const newEvent = new Event({
      userId: decoded.userId,
      day,
      title,
      color,
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

// DELETE: Supprimer tous les événements d'un jour spécifique
export async function DELETE(req: NextRequest) {
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

  const { day } = await req.json() as { day: string };

  if (!day) {
    return NextResponse.json({ error: "Jour manquant" }, { status: 400 });
  }

  try {
    await Event.deleteMany({ userId: decoded.userId, day });
    return NextResponse.json(
      { message: `Événements du ${day} supprimés avec succès` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression des événements :", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression des événements" },
      { status: 500 }
    );
  }
}
