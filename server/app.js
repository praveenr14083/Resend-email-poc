import { envConfig } from "./config/env.js";
import express from "express";
import cors from "cors";
import contactRoutes from "./modules/emailNotify/routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/contact", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
