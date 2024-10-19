import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../utils/db';
import Event from '../../models/Event';

export async function GET(request: Request) {
  await connectToDatabase();
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const events = await Event.find({ userId });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  
  const newEvent = new Event(data);
  await newEvent.save();
  return NextResponse.json(newEvent, { status: 201 });
}
