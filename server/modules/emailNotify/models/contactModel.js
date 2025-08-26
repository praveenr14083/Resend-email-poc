const { z } = require("zod");

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  subject: z.string().min(3, "Subject is too short"),
  service: z.string().min(2, "Service is required"),
  message: z.string().min(5, "Message is too short"),
});

module.exports = { contactSchema };
