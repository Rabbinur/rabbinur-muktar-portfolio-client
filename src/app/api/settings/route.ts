import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import SettingsModel from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  try {
    await mongodbConnection();
    let settings = await SettingsModel.findOne();
    if (!settings) {
      settings = await SettingsModel.create({});
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Settings retrieved successfully",
      data: settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await mongodbConnection();
    const body = await req.json();

    let settings = await SettingsModel.findOne();
    let updated;

    if (!settings) {
      updated = await SettingsModel.create(body);
    } else {
      updated = await SettingsModel.findByIdAndUpdate(
        settings._id,
        { $set: body },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Settings updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
