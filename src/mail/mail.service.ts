import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'Email Verification',
      template: './confirmation',
      context: {
        token: token,
      },
    };

    await this.mailerService.sendMail(mailOptions);
  }
}
