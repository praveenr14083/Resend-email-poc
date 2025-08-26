import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  PORT: process.env.PORT,
  GOOGLE_SCRIPT_URL: process.env.GOOGLE_SCRIPT_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
};
