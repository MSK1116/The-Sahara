import { NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import axios from "axios";

export async function POST(req) {
  try {
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file || !userId) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = process.env.THE_SAHARA_FRONTEND_BLOB_READ_WRITE_TOKEN;

    const { blobs } = await list({
      prefix: `profilePicture/${userId}`,
      token,
    });

    for (const blob of blobs) {
      await del(blob.url, { token });
    }

    await new Promise((res) => setTimeout(res, 500));
    const ext = file.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `profilePicture/${userId}_${timestamp}.${ext}`;

    const blobConnection = await put(fileName, file, {
      access: "public",
      token,
      allowOverwrite: true,
    });

    const imageUrl = blobConnection.url;

    //  Get Auth0 Management API token

    const tokenRes = await axios.post(
      `https://${AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: `https://${AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const auth0Token = tokenRes.data.access_token;
    if (!auth0Token) return NextResponse.json({ error: "Auth0 token missing" }, { status: 401 });

    // 4️⃣ Update user's picture in Auth0
    await axios.patch(`https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, { picture: imageUrl }, { headers: { Authorization: `Bearer ${auth0Token}`, "Content-Type": "application/json" } });

    return NextResponse.json({ success: true, blobConnection });
  } catch (err) {
    console.error("Error uploading profile picture:", err.response?.data || err.message);
    const status = err.response?.status || 500;
    return NextResponse.json({ error: err.response?.data || err.message || "Unknown server error" }, { status });
  }
}
