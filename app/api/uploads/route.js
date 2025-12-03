import { NextResponse } from "next/server";
import { Client, Storage, ID } from "node-appwrite";

// Initialize Appwrite client for server-side
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const storage = new Storage(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

export async function POST(req) {
    console.log("Upload API called");

    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            console.log("No file provided");
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        console.log("File received:", file.name, "Size:", file.size);

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${timestamp}-${originalName}`;

        // Convert File to Buffer for Appwrite
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a File object for Appwrite SDK
        const blob = new Blob([buffer], { type: file.type });
        const uploadFile = new File([blob], filename, { type: file.type });

        // Upload to Appwrite Storage
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            uploadFile
        );

        console.log("Appwrite upload response:", response);

        // Generate the file URL
        const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

        console.log("File URL:", fileUrl);

        return NextResponse.json({
            url: fileUrl,
            fileId: response.$id,
            filename: filename
        });
    } catch (err) {
        console.error("Upload API Error:", err.message);
        return NextResponse.json({
            error: "Upload failed",
            details: err.message
        }, { status: 500 });
    }
}
