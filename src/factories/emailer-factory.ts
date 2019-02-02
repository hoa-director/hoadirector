import { createTransport, Transporter } from 'nodemailer';

import { Emailer } from '../classes/emailer';

export class EmailerFactory {
  static createEmailer(): Emailer {
    const transporter: Transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailer = new Emailer(transporter);

    return emailer;
  }
}
