import { contactSchema } from "../models/contactModel.js";
import { processContactForm } from "../services/contactService.js";

export const submitContactForm = async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const result = await processContactForm(validatedData);

    res
      .status(200)
      .json({ message: "Contact form submitted successfully", result });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};
