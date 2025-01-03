import { NextResponse } from "next/server";
import Task from "@/app/models/Task"; // Modèle Task Mongoose
import { connectToDatabase } from "@/app/utils/db"; // Fonction pour la connexion à la base de données
import jwt, { JwtPayload } from "jsonwebtoken";

// Fonction pour vérifier et décoder le token JWT
const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};

// GET: Récupérer une tâche par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
    }

    // Vérification que la tâche appartient à l'utilisateur connecté
    if (task.userId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Accès non autorisé à cette tâche" },
        { status: 403 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la tâche" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour une tâche par ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;
  const { content, priority, dueDate, completed } = await req.json();

  // Validation de la priorité
  const validPriorities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
  let validatedPriority: "low" | "medium" | "high" | undefined;
  if (priority && validPriorities.includes(priority)) {
    validatedPriority = priority;
  }

  // Conversion de dueDate si nécessaire
  let validatedDueDate: Date | null = null;
  if (dueDate) {
    validatedDueDate = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
    }

    // Vérification que la tâche appartient à l'utilisateur connecté
    if (task.userId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Accès non autorisé à cette tâche" },
        { status: 403 }
      );
    }

    // Mettre à jour les champs
    task.content = content || task.content;
    task.priority = validatedPriority || task.priority;
    task.dueDate = validatedDueDate || task.dueDate;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    return NextResponse.json(task, { status: 200 });
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la tâche" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une tâche par ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
    }

    // Vérification que la tâche appartient à l'utilisateur connecté
    if (task.userId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Accès non autorisé à cette tâche" },
        { status: 403 }
      );
    }

    await task.deleteOne(); // Suppression de la tâche
    return NextResponse.json(
      { message: "Tâche supprimée avec succès" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la tâche" },
      { status: 500 }
    );
  }
}
