// app/api/deleteUser/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
  console.error("Missing required Auth0 env variables. Make sure AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET are set.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing required field: userId" }, { status: 400 });
    }

    // 1️⃣ Get Auth0 Management API token
    let tokenData;
    try {
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
      tokenData = tokenRes.data;
    } catch (tokenErr) {
      console.error("Auth0 token error:", tokenErr.response?.data || tokenErr.message);
      const status = tokenErr.response?.status || 500;
      return NextResponse.json({ error: tokenErr.response?.data || "Failed to obtain Auth0 token" }, { status });
    }

    if (!tokenData?.access_token) {
      return NextResponse.json({ error: "Auth0 token missing" }, { status: 401 });
    }

    // 2️⃣ Delete user in Auth0
    try {
      await axios.delete(`https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });
      console.log(`✅ User deleted: ${userId}`);
    } catch (deleteErr) {
      console.error("Failed to delete user in Auth0:", deleteErr.response?.data || deleteErr.message);
      const status = deleteErr.response?.status || 500;
      return NextResponse.json({ error: deleteErr.response?.data || "Failed to delete user" }, { status });
    }

    // Optional: Delete user from your own MongoDB as well
    // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/deleteOfficer`, { userId });

    return NextResponse.json({ success: true, userId }, { status: 200 });
  } catch (err) {
    console.error("deleteUser error:", err.response?.data || err.message || err);
    const status = err.response?.status || 500;
    return NextResponse.json({ error: err.response?.data || err.message || "Unknown server error" }, { status });
  }
}
