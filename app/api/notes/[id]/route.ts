import { NextResponse } from "next/server";
import Note from "@/app/models/Note";
import { connectToDatabase } from "@/app/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

// Définir le type pour le token décodé
interface DecodedToken extends JwtPayload {
  userId: string;
}

// Fonction pour vérifier et décoder le token JWT
const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch (error) {
    console.error("Erreur de décodage du token:", error);
    return null;
  }
};

// PUT: Mettre à jour une note spécifique
export async function PUT(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  await connectToDatabase();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Token invalide", details: "Le token JWT est invalide ou a expiré." }, { status: 401 });
  }

  const { content, title }: { content: string; title: string } = await req.json();

  try {
    const note = await Note.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId },
      { content, title },
      { new: true }
    );

    if (!note) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la note:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la note", details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une note spécifique
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  await connectToDatabase();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Token invalide", details: "Le token JWT est invalide ou a expiré." }, { status: 401 });
  }

  try {
    const note = await Note.findOneAndDelete({
      _id: params.id,
      userId: decoded.userId,
    });

    if (!note) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note supprimée avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la note:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la note", details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
