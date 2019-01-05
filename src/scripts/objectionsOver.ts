import * as dotenv from 'dotenv';
dotenv.config();
import { Association, Objection } from '../schema/schemas';

Association.findAllWithUserEmails().then((associations) => {
  associations.map((association) => {
    association.getExpiredObjections().then((objections) => {
      console.log(objections.length);
      objections.map(async (objection) => {
        const votes = await objection.getResults();
        console.log(votes);
      });
    });
  });
});
