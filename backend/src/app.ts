import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import { allExceptionFilter } from "./filters/allExceptionFilter.js";

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


app.use(allExceptionFilter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
