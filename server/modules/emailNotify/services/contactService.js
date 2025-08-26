const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const processContactForm = async (contactData) => {
  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["praveengabap@gmail.com"],
      subject: `New Contact Form Submission: ${contactData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Service:</strong> ${contactData.service}</p>
        <p><strong>Message:</strong><br/> ${contactData.message}</p>
      `,
    });

    return { success: true, message: "Email sent successfully via Resend" };
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};

module.exports = { processContactForm };
