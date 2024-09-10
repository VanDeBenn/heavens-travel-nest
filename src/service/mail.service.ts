// mail.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

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

  async sendPasswordResetEmail(to: string, token: string) {
    const authenticator = Math.random();
    const resetLink = `http://localhost:3000/authenticator?token=${token}?code=${authenticator}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>${authenticator}</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
