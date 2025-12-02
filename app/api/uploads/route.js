import { NextResponse } from "next/server";
import ftp from "basic-ftp";
import { Readable } from "stream";

// Force Node.js runtime (required for basic-ftp)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

        const buffer = Buffer.from(await file.arrayBuffer());

        // Generate unique filename to avoid conflicts
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, ''); // Clean filename
        const filename = `${timestamp}-${originalName}`;

        const ftpHost = process.env.FTP_HOST;
        const ftpUser = process.env.FTP_USER;
        const ftpPassword = process.env.FTP_PASSWORD;
        const ftpPath = process.env.FTP_UPLOAD_PATH;

        console.log("FTP Config:", {
            host: ftpHost,
            user: ftpUser,
            path: ftpPath,
            hasPassword: !!ftpPassword
        });

        // Check if FTP credentials are configured
        if (!ftpHost || !ftpUser || !ftpPassword) {
            console.error("FTP credentials not configured");
            return NextResponse.json({
                error: "FTP not configured",
                details: "FTP credentials are missing in environment variables"
            }, { status: 500 });
        }

        const client = new ftp.Client(30000); // 30 second timeout
        client.ftp.verbose = true;

        try {
            console.log("Connecting to FTP...");

            await client.access({
                host: ftpHost,
                user: ftpUser,
                password: ftpPassword,
                secure: true, // Use FTPS (explicit TLS)
                secureOptions: { rejectUnauthorized: false },
                port: 21,
            });

            console.log("FTP connected successfully");

            // Ensure directory exists
            try {
                await client.ensureDir(ftpPath);
                console.log("Directory ensured:", ftpPath);
            } catch (dirErr) {
                console.log("Directory may already exist or path issue:", dirErr.message);
            }

            // Convert buffer to readable stream for FTP upload
            const readableStream = Readable.from(buffer);

            const uploadPath = `${ftpPath}/${filename}`;
            console.log("Uploading to:", uploadPath);

            await client.uploadFrom(readableStream, uploadPath);
            console.log("Upload complete");

            const imageUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}/uploads/${filename}`;
            console.log("Image URL:", imageUrl);

            return NextResponse.json({
                url: imageUrl,
                filename: filename
            });
        } catch (ftpErr) {
            console.error("FTP Error:", ftpErr.message);
            console.error("FTP Error Stack:", ftpErr.stack);
            return NextResponse.json({
                error: "FTP upload failed",
                details: ftpErr.message
            }, { status: 500 });
        } finally {
            client.close();
        }
    } catch (err) {
        console.error("Upload API Error:", err.message);
        return NextResponse.json({
            error: "Upload failed",
            details: err.message
        }, { status: 500 });
    }
}
