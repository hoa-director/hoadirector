import * as dotenv from 'dotenv';
dotenv.config();
import { Association } from '../schema/schemas';
import { EmailerFactory } from '../factories/emailer-factory';

const emailer = EmailerFactory.createEmailer();
Association.findAllWithUserEmails().then((associations) => {
  associations.map((association) => {
    const emails = association.users.map((user) => user ? user.email : '');
    const emailList = emails.join(', ');
    association.getExpiredObjections().then((objections) => {
      objections.map(async (objection) => {
        emailer.sendMail({
          from: process.env.EMAIL_FROM,
          to: emailList,
          subject: 'Voting on an objection has ended',
          text: `
          An objection in your asscoation has reached the end of the voting period.
          To view the results please use the following link:
          hoadirector.com/objection/view/${objection.id}
          `,
          html: `
          <p>An objection in your asscoation has reached the end of the voting period.</p>
          <p>To view the results click <a href="hoadirector.com/objection/view/${objection.id}">here</a></p>
          <p>or use the following link:</p>
          <p>hoadirector.com/objection/view/${objection.id}</p>
          `,
        });
        objection.closedAt = new Date();
        objection.save();
      });
    });
  });
});
