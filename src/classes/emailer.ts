import { SendMailOptions, Transporter } from 'nodemailer';

export class Emailer {
  transporter: Transporter;

  constructor(transporter: Transporter) {
    console.log('testing transport');
    transporter.verify((error) => {
      if (error) {
        console.log(error);
        throw new Error('transporter failed');
      } else {
        console.log('Server is ready to take our messages');
      }
    });
    this.transporter = transporter;
  }

  sendMail(options: SendMailOptions) {
    this.transporter.sendMail(options);
  }
}
