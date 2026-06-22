import { NextRequest, NextResponse } from "next/server";
import mongodbConnection from "@/lib/mongodbConnection";
import { AdminModel } from "@/models/Admin";
import BcryptInstance from "@/lib/bcrypt";
import JwtHelper from "@/lib/jwtHelper";
import { cookies } from "next/headers";

export const runtime = "nodejs";

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

    const { current_password, new_password } = await req.json();

    if (!current_password || !new_password) {
      return NextResponse.json(
        { success: false, message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    const admin = await AdminModel.findById(decoded.id);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const isMatch = await BcryptInstance.compare(current_password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect. Please provide the correct old password" },
        { status: 400 }
      );
    }

    if (current_password === new_password) {
      return NextResponse.json(
        { success: false, message: "Your old and new passwords are same. Please provide a different new password" },
        { status: 400 }
      );
    }

    const hashedNewPassword = await BcryptInstance.hash(new_password);
    admin.password = hashedNewPassword;
    await admin.save();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Your password has been changed successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
