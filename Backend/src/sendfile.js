const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bulejeser@gmail.com",
    pass: "ivmo nyeh iqnr wvpg",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "bulejeser@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error al enviar el email", error);
  }
};

module.exports = { sendEmail };
