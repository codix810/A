import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}