import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTask = new Task(body);
    const savedTask = await newTask.save();
    return NextResponse.json(savedTask);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
