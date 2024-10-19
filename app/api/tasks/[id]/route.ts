import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../../utils/db';
import Task from '../../../models/Task';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const task = await Task.findById(params.id);
  return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();

  const updatedTask = await Task.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedTask);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Task.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Task deleted' }, { status: 204 });
}
