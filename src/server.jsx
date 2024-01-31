const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

app.post("/submit-form", (req, res) => {
  const { userInput, anonymous } = req.body;

  const mailOptions = {
    from: "callum.ledsom@summitmedia.com", // Your email address
    to: "callum.ledsom@summitmedia.com", // Your email address
    subject: "New Form Submission",
    text: `User Input: ${userInput}\nAnonymous: ${anonymous ? "Yes" : "No"}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
