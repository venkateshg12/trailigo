

type optType = {
    otp : string,
}
export const getOTPEmailTemplate = ({otp} : optType) =>{
    const html = `<!DOCTYPE html><html lang="en-US"><head><meta charset="UTF-8"><title>Trailigo - OTP Verification</title><meta name="description" content="Email verification code"><style type="text/css">a:hover { text-decoration: underline !important; }</style></head><body style="margin: 0; background-color: #f2f3f8;"><table width="100%" bgcolor="#f2f3f8" style="font-family: 'Open Sans', sans-serif;"><tr><td><table style="max-width: 670px; margin: 0 auto; background: #fff; border-radius: 3px; box-shadow: 0 6px 18px rgba(0,0,0,0.06);"><tr><td style="padding: 40px;"><h1 style="font-size: 32px; color: #2f89ff; margin-bottom: 10px; text-align: center;">Trailigo</h1><hr style="border: none; height: 1px; background-color: #cecece;"><h2 style="color: #1e1e2d; font-weight: 500; font-size: 24px; margin: 30px 0 10px; text-align: center;">Your Verification Code</h2><p style="color: #455056; font-size: 15px; text-align: center;">Use the following code to verify your email address.</p><p style="color : #455056; font-size : 15px; text-align: center">The code is valid for <strong>10 minutes</strong>.</p><div style="font-size: 36px; font-weight: bold; text-align: center; letter-spacing: 8px; margin: 30px 0; color: #2f89ff;">${otp}</div><p style="color: #999; font-size: 12px; text-align: center;">If you did not request this, you can safely ignore this email.</p></td></tr></table></td></tr></table></body></html>`;
    return html
}