import nodemailer from "nodemailer";
import { User } from "@/models/UserModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPassword: hashedToken,
        forgetPasswordExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "58508ab242980e",
        pass: "e48accbcb21847",
        // adding this in .env files
      },
    });
    const mailOptions = {
      from: "cy@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY"
          ? "Verify your email"
          : "Rest password verification",
      html: `
    <p>Click here</p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">to change something</a><p>. or ${process.env.DOMAIN}/verifyemail?token=${hashedToken}"</p>
    `,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new Error(error);
  }
};
