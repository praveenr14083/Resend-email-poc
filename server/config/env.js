import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  PORT: process.env.PORT || 5000
};