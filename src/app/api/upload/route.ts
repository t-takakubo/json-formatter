import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jsonContent } = body;

    if (!jsonContent) {
      return NextResponse.json(
        { error: "JSONコンテンツが必要です" },
        { status: 400 },
      );
    }

    // const bucketName = process.env.S3_BUCKET_NAME;
    const bucketName = "json-formatter-v1"; // <- temporarily hardcoded for testing
    if (!bucketName) {
      return NextResponse.json(
        { error: "S3バケット名が設定されていません" },
        { status: 500 },
      );
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `formatted-json-${timestamp}.json`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: jsonContent,
      ContentType: "application/json",
    });

    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      message: "S3へのアップロードが完了しました",
      fileName,
    });
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json(
      {
        error: "S3へのアップロードに失敗しました",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
