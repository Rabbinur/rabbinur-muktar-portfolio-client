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
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    if (admin.status !== "active") {
      return NextResponse.json(
        { success: false, message: "Your account is not active" },
        { status: 400 }
      );
    }

    const isMatch = await BcryptInstance.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    };

    const accessToken = JwtHelper.createToken(payload);
    
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    const responseUser = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      profile_picture: admin.image || "",
    };

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        token: accessToken,
        admin: responseUser,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
