import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import MessageModel from "@/models/Message";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    await mongodbConnection();
    const { searchParams } = new URL(req.url);
    const search_query = searchParams.get("search_query") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const skip = (page - 1) * limit;

    let condition = {};
    if (search_query) {
      condition = {
        $or: [
          { name: { $regex: search_query, $options: "i" } },
          { email: { $regex: search_query, $options: "i" } },
          { subject: { $regex: search_query, $options: "i" } },
          { message: { $regex: search_query, $options: "i" } },
        ],
      };
    }

    const [messages, total] = await Promise.all([
      MessageModel.find(condition).sort({ createdAt: -1 }).skip(skip).limit(limit),
      MessageModel.countDocuments(condition),
    ]);

    const totalPage = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Messages retrieved successfully",
      data: {
        data: messages,
        meta: {
          total,
          totalPage,
          page,
          limit,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await mongodbConnection();
    const body = await req.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const message = await MessageModel.create(body);

    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "Your message has been sent successfully",
      data: message,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
