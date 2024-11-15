import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private otpStorage: Record<string, { otp: number; expiry: number }> = {};

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'franz.howell65@ethereal.email',
        pass: 'vnspBAvnWgKfGJPYX5',
      },
    });
  }

  async sendPasswordResetEmail(to: string, reseToken: string, otp: number) {
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    this.otpStorage[reseToken] = { otp, expiry };

    const resetLink = `http://localhost:3000/authenticator?token=${reseToken}?code=${otp}`;

    const mailOptions = {
      from: '"Auth-backend Service" <no-reply@example.com>',
      to: to,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  verifyOtp(reseToken: string, otp: number): boolean {
    const record = this.otpStorage[reseToken];
    if (record && record.expiry > Date.now() && record.otp === otp) {
      delete this.otpStorage[reseToken];
      return true;
    }
    return false;
  }
}
