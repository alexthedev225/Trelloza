// app/routes/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "@/app/utils/sendEmail";

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    // Récupération et typage du corps de la requête
    const { username, email, password }: RegisterRequestBody = await req.json();

    // Validation simple des données
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Connexion à la base de données
    await connectToDatabase();

    // Vérification de l'existence de l'utilisateur
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà" },
        { status: 422 }
      );
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Vérification de la présence de la clé JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
    }

    // Génération du jeton de confirmation
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmationToken: token,
      isConfirmed: false,
    });

    await newUser.save();

    // URL de confirmation d'email
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/confirm?token=${token}`;

    // Envoi de l'email de confirmation
    const emailSent = await sendEmail(
      email,
      "Confirmation de votre inscription",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f3e5f5; border-radius: 10px; background-color: #fff0f5;">
        <h2 style="text-align: center; color: #e91e63; font-size: 24px;">Bienvenue dans notre communauté, ${username} !</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Merci d'avoir rejoint Trelloza ! Pour finaliser votre inscription, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.
        </p>
        <a href="${confirmationUrl}" style="display: inline-block; background-color: #e91e63; color: white; padding: 12px 25px; text-align: center; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; font-size: 16px;">
          Confirmer mon compte
        </a>
        <p style="font-size: 14px; color: #777; line-height: 1.5;">
          Si vous n'avez pas créé de compte avec Trelloza, veuillez ignorer cet email.
        </p>
        <footer style="margin-top: 30px; text-align: center;">
          <p style="font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} Trelloza. Tous droits réservés.</p>
        </footer>
      </div>`
    );

    if (!emailSent) {
      return NextResponse.json(
        { message: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Succès de la création de l'utilisateur
    return NextResponse.json(
      {
        message:
          "Utilisateur créé. Veuillez vérifier votre email pour confirmer votre compte.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Gestion des erreurs
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json(
      { message: `Une erreur est survenue lors de l'inscription : ${error}` },
      { status: 500 }
    );
  }
}
