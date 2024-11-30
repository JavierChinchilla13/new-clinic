const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

// const sendEmail = async ({ to, subject, html }) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport(nodemailerConfig);

//   return transporter.sendMail({
//     from: '"New Clinic" <newClinic@gmail.com>',
//     to,
//     subject,
//     html,
//   });
// };

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: `"New Clinic" ${process.env.CORREO}`, // Replace with your Gmail address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
