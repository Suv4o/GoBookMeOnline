import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FirebaseUserRecord } from 'src/shared/types';

@Injectable()
export class MailService {
  private readonly logger = new Logger('MailService');
  constructor(private mailerService: MailerService) {}

  async verificationEmail(user: FirebaseUserRecord, verificationEmail: string) {
    try {
      const { displayName: name, email } = user;
      await this.mailerService.sendMail({
        to: `${name} <${email}>`,
        subject: 'Verify your email for GoBookMe.Today',
        template: 'email-verification',
        context: {
          name,
          verificationEmail,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
