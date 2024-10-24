import { NextResponse } from "next/server";
import Note from "@/app/models/Note"; // Le modèle Note que tu dois créer
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

// GET: Récupérer toutes les notes de l'utilisateur connecté
export async function GET(req: Request) {
  await connectToDatabase();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("Token manquant");
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    console.log("Token invalide");
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  try {
    const notes = await Note.find({ userId: decoded.userId }).exec();
    console.log("Notes récupérées:", notes);

    if (!notes || notes.length === 0) {
      console.log("Aucune note trouvée");
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des notes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des notes" },
      { status: 500 }
    );
  }
}

// POST: Créer une nouvelle note
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

  const { content, category, tags } = await req.json();

  try {
    const newNote = new Note({
      content,
      category: category || "Général", // Valeur par défaut si pas de catégorie
      tags: tags || [],
      userId: decoded.userId,
    });

    await newNote.save();
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la note" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour une note existante
export async function PUT(req: Request) {
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

  const { id, content, category, tags } = await req.json();

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: decoded.userId },
      { content, category, tags },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la note" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une note
export async function DELETE(req: Request) {
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

  const { id } = await req.json();

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: decoded.userId,
    });

    if (!deletedNote) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note supprimée avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la note" },
      { status: 500 }
    );
  }
}
