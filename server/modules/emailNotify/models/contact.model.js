import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message should be at least 5 characters"),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
});
