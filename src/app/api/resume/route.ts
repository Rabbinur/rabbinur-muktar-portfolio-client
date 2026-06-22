import { NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import SettingsModel from "@/models/Settings";

export const runtime = "nodejs";

export async function POST() {
  try {
    await mongodbConnection();

    let settings = await SettingsModel.findOne();
    let updated;

    if (!settings) {
      updated = await SettingsModel.create({ resumeDownloadCount: 1 });
    } else {
      updated = await SettingsModel.findByIdAndUpdate(
        settings._id,
        { $inc: { resumeDownloadCount: 1 } },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Resume download count incremented",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to increment download count" },
      { status: 500 }
    );
  }
}
