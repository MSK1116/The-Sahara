import { NextResponse } from "next/server";
import axios from "axios";
import { auth0 } from "@/lib/auth0";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CONNECTION } = process.env;

if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_CONNECTION) {
  console.error("Missing Auth0 env variables.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.employee?.email?.trim();
    const databaseSlug = body.databaseSlug;

    if (!email) {
      return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
    }

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

    const usersRes = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: `email:"${email}"`,
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
    const sessionAuth0 = await auth0.getSession();
    const removeInMongoDb = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/las/removeOfficer`,
      { nameEn: body.employee.nameEn, _id: body.employee._id, databaseSlug },
      {
        headers: {
          Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true, userId });
  } catch (err) {
    console.error("deleteUser error:", err.response?.data || err.message || err);
    const status = err.response?.status || 500;
    return NextResponse.json({ error: err.response?.data || err.message || "Unknown server error" }, { status });
  }
}
