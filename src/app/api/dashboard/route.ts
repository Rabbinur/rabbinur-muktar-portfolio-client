import { NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import ProjectModel from "@/models/Project";
import MessageModel from "@/models/Message";
import SettingsModel from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  try {
    await mongodbConnection();

    const [totalProjects, totalMessages, unreadMessages, settings] = await Promise.all([
      ProjectModel.countDocuments(),
      MessageModel.countDocuments(),
      MessageModel.countDocuments({ status: "new" }),
      SettingsModel.findOne(),
    ]);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Dashboard data retrieved successfully",
      data: {
        totalProjects,
        totalMessages,
        unreadMessages,
        resumeDownloads: settings?.resumeDownloadCount || 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve dashboard data" },
      { status: 500 }
    );
  }
}
