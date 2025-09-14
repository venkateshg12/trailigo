import userModel from "../models/user.model";
import verificationCodeModel from "../models/verification.model";
import appAssert from "../utils/appAssert";
import verificationCodeTypes from "../constants/verificationCodeTypes";

type verifyOTPParams = {
  userId: string;
  code: string;
};

export const verifyOTP = async ({ userId, code }: verifyOTPParams) => {
  const verificationCode = await verificationCodeModel.findOne({
    userId,
    code,
    type: verificationCodeTypes.EmailVerification,
  });

  appAssert(verificationCode, 400, "Invalid OTP");

  const isExpired = verificationCode.expiresAt.getTime() < Date.now();
  appAssert(!isExpired, 400, "OTP has expired");
  await userModel.findByIdAndUpdate(userId,{ verified: true });
  await verificationCodeModel.deleteOne({ _id: verificationCode._id });

  return { message: "Email verified successfully" };
};