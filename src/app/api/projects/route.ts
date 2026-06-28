import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import ProjectModel from "@/models/Project";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    await mongodbConnection();
    const { searchParams } = new URL(req.url);
    const search_query = searchParams.get("search_query") || "";

    let condition = {};
    if (search_query) {
      condition = {
        $or: [
          { title: { $regex: search_query, $options: "i" } },
          { techStack: { $regex: search_query, $options: "i" } },
        ],
      };
    }

    const projects = await ProjectModel.find(condition).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Projects retrieved successfully",
      data: {
        data: projects,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await mongodbConnection();
    const body = await req.json();

    if (!body.title || !body.thumbnail || !body.description || !body.techStack) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Auto-generate slug from title if not provided
    if (!body.slug || body.slug.trim() === "") {
      body.slug = body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }

    // Remove form-only helper fields before saving
    const { techStackInput, featuresInput, ...cleanBody } = body;

    const project = await ProjectModel.create(cleanBody);

    // Revalidate paths for instant portfolio updates
    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "Project created successfully",
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
