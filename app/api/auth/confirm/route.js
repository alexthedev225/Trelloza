// app/api/confirm/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: "Token manquant" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Mettre à jour l'utilisateur pour confirmer son compte
    user.isConfirmed = true;
    user.confirmationToken = undefined; 
    await user.save();

    // Rediriger vers une page de confirmation (vous devez créer cette page)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`);
  } catch (error) {
    console.error("Erreur lors de la confirmation :", error);
    return NextResponse.json({ message: "Erreur lors de la confirmation" }, { status: 500 });
  }
}
