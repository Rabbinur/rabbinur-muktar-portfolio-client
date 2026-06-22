import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import { AdminModel } from "@/models/Admin";
import JwtHelper from "@/lib/jwtHelper";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET() {
  try {
    await mongodbConnection();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const decoded = JwtHelper.verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const admin = await AdminModel.findById(decoded.id).select("-password");
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Standardize profile_picture property for admin compatibility
    const adminObj = admin.toObject();
    adminObj.profile_picture = adminObj.image || "";

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Admin profile retrieved",
      data: adminObj,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await mongodbConnection();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const decoded = JwtHelper.verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const updateData = await req.json();
    
    // Prevent updating password through this endpoint
    if (updateData.password) {
      delete updateData.password;
    }

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      decoded.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const adminObj = updatedAdmin.toObject();
    adminObj.profile_picture = adminObj.image || "";

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Profile updated successfully",
      data: adminObj,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
