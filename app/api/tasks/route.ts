import { NextResponse } from "next/server";
import Task from "@/app/models/Task";
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

// GET: Récupérer toutes les tâches de l'utilisateur connecté
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
    const tasks = await Task.find({ userId: decoded.userId }).exec();
    console.log("Tasks récupérées:", tasks);

    if (!tasks || tasks.length === 0) {
      console.log("Aucune tâche trouvée");
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des tâches" },
      { status: 500 }
    );
  }
}

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

  const { content, priority, dueDate } = await req.json();

  try {
    const newTask = new Task({
      content,
      priority,
      dueDate: dueDate || null,
      completed: false,
      userId: decoded.userId,
    });

    await newTask.save();
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la tâche" },
      { status: 500 }
    );
  }
}
