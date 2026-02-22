import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express"; // Import the Inngest Express middleware

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

// console.log(ENV.PORT);
// console.log(ENV.DB_URL);
app.use("/api/inngest", serve({client:inngest, functions}))

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running successfully" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the book endpoint" });
});


if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
  app.listen(ENV.PORT, () => console.log("server is running on port:" ,ENV.PORT));
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
  
