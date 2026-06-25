import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import MessageModel from "@/models/Message";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongodbConnection();
    const { id } = await params;

    const message = await MessageModel.findById(id);

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Message retrieved successfully",
      data: message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve message" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongodbConnection();
    const { id } = await params;
    const body = await req.json();

    const message = await MessageModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Message updated successfully",
      data: message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongodbConnection();
    const { id } = await params;

    const message = await MessageModel.findByIdAndDelete(id);

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Message deleted successfully",
      data: message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete message" },
      { status: 500 }
    );
  }
}
