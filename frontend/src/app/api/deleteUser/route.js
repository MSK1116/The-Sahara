import { NextResponse } from "next/server";
import axios from "axios";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CONNECTION } = process.env;

if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_CONNECTION) {
  console.error("Missing Auth0 env variables.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const username = body.employee.nameEn?.trim().split(" ")[0];
    const databaseSlug = body.databaseSlug;

    if (!username) {
      return NextResponse.json({ error: "Missing required field: username" }, { status: 400 });
    }

    // 1️⃣ Get Auth0 Management API token
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

    const token = tokenRes.data.access_token;
    if (!token) return NextResponse.json({ error: "Auth0 token missing" }, { status: 401 });

    // 2️⃣ Find user by username
    const usersRes = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: `username:"${username}"`,
        search_engine: "v3",
      },
    });

    const user = usersRes.data[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.user_id;

    await axios.delete(`https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const removeInMongoDb = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/removeOfficer`, { nameEn: body.employee.nameEn, _id: body.employee._id, databaseSlug });

    return NextResponse.json({ success: true, userId });
  } catch (err) {
    console.error("deleteUser error:", err.response?.data || err.message || err);
    const status = err.response?.status || 500;
    return NextResponse.json({ error: err.response?.data || err.message || "Unknown server error" }, { status });
  }
}
