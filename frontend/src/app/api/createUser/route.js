import { NextResponse } from "next/server";
import axios from "axios";

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CONNECTION } = process.env;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, nameEn, nameNp, post, databaseSlug, branchType, branchNameNp, branchCode, profileImage } = body;

    if ((!email || !password || !nameEn || !nameNp || !post || !databaseSlug, !branchType)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
      console.error("Failed to get Auth0 token:", err.response?.data || err.message);
      return NextResponse.json({ error: "Failed to get Auth0 token" }, { status: 500 });
    }

    // 2️⃣ Create the user
    let createdUser;
    try {
      const response = await axios.post(
        `https://${AUTH0_DOMAIN}/api/v2/users`,
        {
          email,
          password,
          connection: AUTH0_CONNECTION,
          name: nameEn,
          username: nameEn.trim().split(" ")[0] + Math.floor(1000 + Math.random() * 9000),
          nickname: nameEn.trim().split(" ")[0],
          picture: profileImage,
          app_metadata: {
            officerPost: post,
            databaseSlug,
            officerBranchType: branchType,
            officerBranch: branchNameNp,
            officerBranchCode: branchCode,
          },
        },
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      );
      createdUser = response.data;
    } catch (err) {
      console.error("Failed to create user in Auth0:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to create user";
      return NextResponse.json({ error: message }, { status: err.response?.status || 500 });
    }

    const addInMongoDb = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/addOfficer`, { post, nameEn, nameNp, databaseSlug });

    return NextResponse.json({ email: createdUser.email, user_id: createdUser.user_id }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in createUser:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
