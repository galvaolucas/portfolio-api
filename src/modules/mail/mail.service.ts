import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface IUser {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: IUser) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Contato - Lucas Galvão',
      template: './email', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
      },
    });
  }
}
