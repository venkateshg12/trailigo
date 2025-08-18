import nodemailer from "nodemailer"; // npm i --save-dev @types/nodemailer
import { getOTPEmailTemplate } from "./emailTemplates";
import { USER_EMAIL, USER_PASSWORD } from "../constants/env";

export const sendVerificationEmail = async (toEmail: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail", // or your preferred email service
        auth: {
            user: USER_EMAIL,
            pass: USER_PASSWORD,
        },
    });

    const mailOptions = {
        from: USER_EMAIL,
        to: toEmail,
        subject: "Your OTP Verification Code",
        html: getOTPEmailTemplate({ otp }),
    };
    await transporter.sendMail(mailOptions);
};
