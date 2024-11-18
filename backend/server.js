import express from "express";
import authRoutes from "./routes/auth.route.js";
import { ENV_VAR } from "./config/envVar.js";
import { connectDB } from "./config/database.js";

const app = express();

const PORT = ENV_VAR.PORT;

app.use(express.json()); // parse req.body
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server run at port", PORT);
  connectDB();
});
