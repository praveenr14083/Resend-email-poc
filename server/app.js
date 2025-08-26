require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contactRoutes = require("./modules/emailNotify/routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount route at /contact
app.use("/contact", contactRoutes); // POST /contact

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
