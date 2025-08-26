import { contactSchema } from "../models/contact.model.js";
import { sendContactEmail } from "../services/contact.service.js";
import { saveToGoogleSheet } from "../services/googleSheet.service.js";

export const submitContactForm = async (req, res) => {
  try {
    // Validate form with Zod
    const validatedData = contactSchema.parse(req.body);

    // Save data into Google Sheet
    const sheetResponse = await saveToGoogleSheet(validatedData);

    // Send email notification
    const emailResponse = await sendContactEmail(validatedData);

    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      sheetResponse,
      emailResponse,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};
