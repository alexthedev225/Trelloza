import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../../utils/db';
import Event from '../../../models/Event';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const event = await Event.findById(params.id);
  return NextResponse.json(event);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();

  const updatedEvent = await Event.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedEvent);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Event.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Event deleted' }, { status: 204 });
}
