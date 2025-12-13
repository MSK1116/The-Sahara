import { NextResponse } from "next/server";
import axios from "axios";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

export async function POST(req) {
  try {
    const body = await req.json();

    const { userId, post, databaseSlug, branchType, branchNameNp, branchCode } = body;
    console.log(body);

    if (!userId || !post || !databaseSlug || !branchType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let accessToken;
    try {
      const tokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: `https://${AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      });

      accessToken = tokenResponse.data.access_token;
    } catch (err) {
      console.error("Auth0 token error:", err.response?.data || err.message);
      return NextResponse.json({ error: "Failed to get Auth0 token" }, { status: 500 });
    }

    /* 2️⃣ Update app_metadata */
    try {
      const response = await axios.patch(
        `https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
        {
          app_metadata: {
            officerPost: post,
            databaseSlug,
            officerBranchType: branchType,
            officerBranch: branchNameNp,
            officerBranchCode: branchCode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return NextResponse.json(
        {
          message: "app_metadata updated successfully",
          user_id: response.data.user_id,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error("Failed to update app_metadata:", err.response?.data || err.message);
      return NextResponse.json(
        {
          error: err.response?.data?.message || "Failed to update user",
        },
        { status: err.response?.status || 500 }
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
