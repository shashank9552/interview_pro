import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running successfully" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the book endpoint" });
});



const startServer = async () => {
  try {
    await connectDB();
  app.listen(ENV.PORT, () => console.log("server is running on port:" ,ENV.PORT));
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
  
