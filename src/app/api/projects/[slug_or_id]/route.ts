import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import ProjectModel from "@/models/Project";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug_or_id: string }> }
) {
  try {
    await mongodbConnection();
    const { slug_or_id } = await params;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug_or_id);
    const query = isObjectId ? { _id: slug_or_id } : { slug: slug_or_id };

    const project = await ProjectModel.findOne(query);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug_or_id: string }> }
) {
  try {
    await mongodbConnection();
    const { slug_or_id } = await params;
    const body = await req.json();

    const project = await ProjectModel.findByIdAndUpdate(slug_or_id, body, {
      new: true,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug_or_id: string }> }
) {
  try {
    await mongodbConnection();
    const { slug_or_id } = await params;

    const project = await ProjectModel.findByIdAndDelete(slug_or_id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
