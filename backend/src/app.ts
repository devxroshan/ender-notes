import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Filters
import { allExceptionFilter } from "./filters/allExceptionFilter.js";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import noteRoutes from "./modules/note/note.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import { isLoggedIn } from "./middlewares/is-logged-in.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: (process.env.FRONTEND as string) ?? "http://localhost:3000",
    allowedHeaders: "Content-Type",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/note", isLoggedIn, noteRoutes);
app.use("/profile", isLoggedIn, profileRoutes);

app.use(allExceptionFilter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
