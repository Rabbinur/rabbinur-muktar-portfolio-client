import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import ExperienceModel from "@/models/Experience";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongodbConnection();
    const { id } = await params;
    const body = await req.json();

    const experience = await ExperienceModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!experience) {
      return NextResponse.json(
        { success: false, message: "Experience not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update experience" },
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

    const experience = await ExperienceModel.findByIdAndDelete(id);

    if (!experience) {
      return NextResponse.json(
        { success: false, message: "Experience not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Experience deleted successfully",
      data: experience,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete experience" },
      { status: 500 }
    );
  }
}
