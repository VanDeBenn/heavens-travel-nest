import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private otpStorage: Record<string, { otp: number; expiry: number }> = {};

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // app pw a
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2',
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  async sendPasswordResetEmail(to: string, reseToken: string, otp: number) {
    try {
      const resetLink = `http://localhost:3000/authenticator?token=${reseToken}&code=${otp}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <p><a href="${resetLink}">Reset Password</a></p>
          <p>Your OTP code is: <strong>${otp}</strong></p>
          <p>If you did not request this, please ignore this email.</p>
        `,
      };

      // Validasi koneksi sebelum mengirim
      await new Promise<void>((resolve, reject) => {
        this.transporter.verify((error) => {
          if (error) {
            console.error('SMTP Connection Error:', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });

      // Kirim email
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Detailed Email Sending Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // ... method lainnya tetap sama
  verifyOtp(reseToken: string, otp: number): boolean {
    const record = this.otpStorage[reseToken];
    if (record && record.expiry > Date.now() && record.otp === otp) {
      delete this.otpStorage[reseToken];
      return true;
    }
    return false;
  }
}
