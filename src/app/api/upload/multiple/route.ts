import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files"); // expects field name "files"

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      if (!(file instanceof File)) {
        throw new Error("Invalid file entry");
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<{ secure_url: string; public_id: string; url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "portfolio" }, (error, result) => {
              if (error || !result) {
                reject(error || new Error("Upload failed"));
              } else {
                resolve({
                  secure_url: result.secure_url,
                  public_id: result.public_id,
                  url: result.secure_url,
                });
              }
            })
            .end(buffer);
        }
      );
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      data: uploadedFiles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload files" },
      { status: 500 }
    );
  }
}
