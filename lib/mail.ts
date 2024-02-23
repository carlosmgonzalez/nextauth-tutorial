import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "carlos@carlosgonzalez.info",
      to: email,
      subject: "@FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "carlos@carlosgonzalez.info",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${confirmLink}">here</a> to reset password</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "carlos@carlosgonzalez.info",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

// import AWS from "aws-sdk";

// AWS.config.update({
//   region: "us-east-2",
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const AWS_SES = new AWS.SES();

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `${domain}/auth/new-verification?token=${token}`;

//   const params = {
//     Destination: {
//       CcAddresses: [email],
//       ToAddresses: [email],
//     },
//     Message: {
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: `
//             <h1>
//               Verification Email
//             </h1>
//             <h2>
//               If you want to verify your email click
//             </h2>
//             <a href="${confirmLink}">
//               HERE
//             </a>
//           `,
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: "Confirm your email",
//       },
//     },
//     Source: `carlos@carlosgonzalez.info`,
//   };

//   try {
//     await AWS_SES.sendEmail(params).promise();
//   } catch (error) {
//     console.log(error);
//   }
// };
