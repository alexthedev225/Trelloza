// src/app/api/tasks/create/route.js

import { connectToDatabase } from "@/app/utils/db";
import Task from "@/app/models/Task";

export async function POST(req) {
  await connectToDatabase();

  const newTask = new Task(await req.json());
  await newTask.save();

  return new Response(JSON.stringify(newTask), {
    headers: { 'Content-Type': 'application/json' },
  });
}
