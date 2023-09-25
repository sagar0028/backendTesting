const nodemailer = require("nodemailer");
require("dotenv").config();

async function nodeMailer(toEmail, subject, rendered, bcc) {
  try {
    const transporter = await nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        // user: process.env.emailUserName,
        // pass: process.env.emailPassword,
      },
    });
    if (mainConfig.testing == 1) {
      rendered = rendered + "<br/>To : " + toEmail;
    }

    const mailOptions = {
      from: mainConfig.mailConfig.fromEmail,
      to: mainConfig.testing == 1 ? mainConfig.testMailTo : toEmail,
      replyTo: "testing@gmail.com",
      subject: subject,
      html: rendered,
    };
    if (bcc && mainConfig.testing != 1) {
      mailOptions.bcc = bcc;
    }

    const sendMail = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { nodeMailer };
