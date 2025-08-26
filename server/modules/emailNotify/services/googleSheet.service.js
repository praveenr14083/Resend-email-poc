import axios from "axios";

export async function saveToGoogleSheet(contactData) {
  try {
    const response = await axios.post(
      process.env.GOOGLE_SCRIPT_URL,
      contactData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("❌ Google Sheet Error:", err.message);
    throw new Error("Failed to save data to Google Sheet");
  }
}
