import AWS from "aws-sdk";
import { Resend } from "resend";

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const AWS_SES = new AWS.SES();

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "carlos@carlosgonzalez.info",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${confirmLink}">here</a> to reset password</p>`,
    });

    if (error) {
      console.log("something went wrong", error);
    }

    return console.log("email sent", data);
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const sender = process.env.AWS_SES_SENDER;

  const params = {
    Destination: {
      CcAddresses: [email],
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h1>
              Verification Email
            </h1>
            <h2>
              If you want to verify your email click 
            </h2>
            <a href="${confirmLink}">
              HERE
            </a>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Confirm your email",
      },
    },
    Source: `carlos@carlosgonzalez.info`,
  };

  try {
    await AWS_SES.sendEmail(params).promise();
    console.log("email send");
  } catch (error) {
    console.log(error);
  }
};
