// app/routes/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginRequestBody = await req.json();

    // Connexion à la base de données
    await connectToDatabase();

    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé avec cet email" },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérification de la présence de la clé JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Retour du token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: unknown) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json(
      { message: `Une erreur est survenue lors de la connexion : ${error}` },
      { status: 500 }
    );
  }
}
