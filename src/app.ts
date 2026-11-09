import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;
import cors from "cors";
import { env } from "process";

// Define allowed origins based on environment state
const allowedOrigins =
  env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://localhost:5173"] // Common dev origins (Vite/Next.js)
    : ["https://yourproductiondomain.com"];

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS policies"));
      }
    },
    credentials: true, // Allow cookies and authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

export default app;
