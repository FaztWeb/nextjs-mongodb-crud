import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();
  try {
    const taskFound = await Task.findById(params.id);

    if (!taskFound)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  dbConnect();

  try {
    const taskUpdated = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!taskUpdated)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);

    if (!taskDeleted)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
