// src/app/api/users/[id]/route.js

import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  await connectToDatabase();

  const user = await User.findById(params.id);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req, { params }) {
  await connectToDatabase();

  const updatedUser = await User.findByIdAndUpdate(params.id, await req.json(), { new: true });
  if (!updatedUser) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(updatedUser), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req, { params }) {
  await connectToDatabase();

  const deletedUser = await User.findByIdAndDelete(params.id);
  if (!deletedUser) {
    return new Response("User not found", { status: 404 });
  }

  return new Response("User deleted", { status: 200 });
}
