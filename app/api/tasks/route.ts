import { NextResponse } from 'next/server';
import {connectToDatabase}  from '../../utils/db';
import Task from '../../models/Task';

export async function GET(request: Request) {
  await connectToDatabase();
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const tasks = await Task.find({ userId });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  
  const newTask = new Task(data);
  await newTask.save();
  return NextResponse.json(newTask, { status: 201 });
}
