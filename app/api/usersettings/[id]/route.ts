import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../../utils/db';
import UserSettings from '../../../models/UserSettings';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const settings = await UserSettings.findById(params.id);
  return NextResponse.json(settings);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();

  const updatedSettings = await UserSettings.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedSettings);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await UserSettings.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User settings deleted' }, { status: 204 });
}
