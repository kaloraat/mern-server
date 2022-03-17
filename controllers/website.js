import cloudinary from "cloudinary";

// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const contact = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, message } = req.body;
    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Email received from contact form",
      html: `
      <h3>Contact form message</h3>
      <p><u>Name</u></p>
      <p>${name}</p>
      <p><u>Email</u></p>
      <p>Email: ${email}</p>
      <p><u>Message</u></p>
      <p>${message}</p>
      `,
    };
    // send email
    try {
      const data = await sgMail.send(emailData);
      // console.log(data);
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
