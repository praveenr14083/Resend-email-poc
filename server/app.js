import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, service, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !subject || !service || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Use verified domain
      to: ["praveengabap@gmail.com"], // Your email
      subject: `New contact from ${name}: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }

    res.status(200).json({ message: "Message sent successfully!", data });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
