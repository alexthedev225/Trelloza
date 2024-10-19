import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../utils/db';
import Note from '../../models/Note';

export async function GET(request: Request) {
  await connectToDatabase();
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const notes = await Note.find({ userId });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  
  const newNote = new Note(data);
  await newNote.save();
  return NextResponse.json(newNote, { status: 201 });
}
