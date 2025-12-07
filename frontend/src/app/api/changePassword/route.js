import { NextResponse } from "next/server";
import axios from "axios";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CONNECTION } = process.env;

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, newPassword } = body;

    if (!user_id || !newPassword) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    let tokenData;
    try {
      const tokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: `https://${AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      });
      tokenData = tokenResponse.data;
    } catch (err) {
      return NextResponse.json({ error: "Failed to get Auth0 admin token" }, { status: 500 });
    }

    // Update password
    try {
      await axios.patch(
        `https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(user_id)}`,
        {
          password: newPassword,
          connection: AUTH0_CONNECTION,
        },
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      );
    } catch (err) {
      const message = err.response?.data?.message || "Failed to change password";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
