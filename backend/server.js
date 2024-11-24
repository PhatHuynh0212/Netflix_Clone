import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VAR } from "./config/envVar.js";
import { connectDB } from "./config/database.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VAR.PORT;

app.use(express.json()); // parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  console.log("Server run at port", PORT);
  connectDB();
});
