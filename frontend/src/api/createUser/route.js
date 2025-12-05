import { getSession, getManagementApiAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async function createUser(req) {
  const session = await getSession(req);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // You might want to add role-based access control here
  // For example, only allow admins to create users.
  // const userRoles = session.user['http://saharalas.com/roles'];
  // if (!userRoles.includes('admin')) {
  //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  // }

  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields: email, password, name, role." }, { status: 400 });
    }

    const { accessToken } = await getManagementApiAccessToken();

    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    const apiUrl = `${auth0Domain}/api/v2/users`;

    const userData = {
      email,
      password,
      name,
      connection: "Username-Password-Authentication", // Or your specific DB connection
      email_verified: true, // Or false to send a verification email
      app_metadata: {
        role: role,
        // You can add other metadata here
        // created_by: session.user.sub,
      },
    };

    const response = await axios.post(apiUrl, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("Auth0 user creation failed:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Internal Server Error",
      },
      { status: error.response?.status || 500 }
    );
  }
};
