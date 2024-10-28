// app/routes/api/register/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "@/app/utils/sendEmail";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validation simple des données
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmationToken: token,
      isConfirmed: false,
    });

    await newUser.save();

    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/confirm?token=${token}`;
    const emailSent = await sendEmail(
      email,
      "Confirmation de votre inscription",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f3e5f5; border-radius: 10px; background-color: #fff0f5;">
  <h2 style="text-align: center; color: #e91e63; font-size: 24px;">Bienvenue dans notre communauté, ${username} !</h2>
  <p style="font-size: 16px; line-height: 1.6; color: #333;">
    Merci d'avoir rejoint Trelloza ! Pour finaliser votre inscription, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.
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
</div>
`
    );

    if (!emailSent) {
      return NextResponse.json(
        { message: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Utilisateur créé. Veuillez vérifier votre email pour confirmer votre compte.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
