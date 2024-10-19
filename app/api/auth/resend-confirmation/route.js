// app/routes/api/resend-confirmation/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";
import jwt from 'jsonwebtoken';
import sendEmail from "@/app/utils/sendEmail";

export async function POST(req) {
  const { email } = await req.json();

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
  }

  if (user.isConfirmed) {
    return NextResponse.json({ message: "Ce compte est déjà confirmé." }, { status: 400 });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm?token=${token}`;
  
  const emailSent = await sendEmail(
    email,
    'Confirmation de votre inscription',
    `<p>Veuillez confirmer votre inscription en cliquant sur le lien suivant : <a href="${confirmationUrl}">${confirmationUrl}</a></p>`
  );

  if (!emailSent) {
    return NextResponse.json({ message: "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }

  return NextResponse.json({ message: "Email de confirmation renvoyé." }, { status: 200 });
}
