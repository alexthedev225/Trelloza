import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../../utils/db';
import Note from '../../../models/Note';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const note = await Note.findById(params.id);
  return NextResponse.json(note);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();

  const updatedNote = await Note.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedNote);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Note.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Note deleted' }, { status: 204 });
}
