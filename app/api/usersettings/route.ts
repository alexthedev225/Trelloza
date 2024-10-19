import { NextResponse } from 'next/server';
import {connectToDatabase }from '../../utils/db';
import UserSettings from '../../models/UserSettings';

export async function GET(request: Request) {
  await connectToDatabase();
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const settings = await UserSettings.findOne({ userId });
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  
  const newSettings = new UserSettings(data);
  await newSettings.save();
  return NextResponse.json(newSettings, { status: 201 });
}
