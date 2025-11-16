import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

import las from "./routes/las.routes.js";
// import getUser from "./routes/users.route.js";
// import chat from "./routes/chat.route.js";
// import chatUtility from "./routes/chatUtility.route.js";
// import askToAi from "./routes/ai.route.js";
// import consoleRoute from "./routes/console.route.js";
// import whatsappRoute from "./routes/whatsapp.route.js";

dotenv.config();

const app = express();
const allowedOrigins = [`${process.env.frontend_url}`, ``];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.set("trust proxy", true);
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODBURI;

if (!MONGODB_URI) {
  console.error("MONGODBURI not set in environment variables!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
const checkJwt = auth({
  audience: "https://backend.bureaucrazy.co",
  issuerBaseURL: `https://auth.bureaucrazy.co/`,
});
app.get("/", (req, res) => {
  res.send("Hello hacker");
});

app.use("/las", las);
// app.use("/chat", chat);
// app.use("/chatUtility", chatUtility);
// app.use("/ai", askToAi);
// app.use("/console", checkJwt, consoleRoute);
// app.use("/whatsapp", whatsappRoute);
