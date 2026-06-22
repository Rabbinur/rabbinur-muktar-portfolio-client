import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import ExperienceModel from "@/models/Experience";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function GET() {
  try {
    await mongodbConnection();
    const experiences = await ExperienceModel.find().sort({ order: 1 });

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Experiences retrieved successfully",
      data: {
        data: experiences,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve experiences" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await mongodbConnection();
    const body = await req.json();

    if (!body.company || !body.role || !body.duration || !body.location) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const experience = await ExperienceModel.create(body);

    // Revalidate homepage for instant update
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create experience" },
      { status: 500 }
    );
  }
}
