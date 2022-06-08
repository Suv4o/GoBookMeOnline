import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, url: string) {
    await this.mailerService.sendMail({
      to: `Aleks <${user.email}>`,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'email-verification',
      context: {
        name: user.displayName,
        url,
      },
    });
  }
}
