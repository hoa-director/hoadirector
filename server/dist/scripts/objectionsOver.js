"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const emailer_factory_1 = require("../factories/emailer-factory");
const schemas_1 = require("../schema/schemas");
const emailer = emailer_factory_1.EmailerFactory.createEmailer();
schemas_1.Association.findAllWithUserEmails().then((associations) => {
    associations.map((association) => {
        const emails = association.users.map((user) => user ? user.email : '');
        const emailList = emails.join(', ');
        association.getExpiredObjections().then((objections) => {
            objections.map((objection) => __awaiter(this, void 0, void 0, function* () {
                const link = `hoadirector.com/resolution-center/objection/view/${objection.id}`;
                emailer.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: emailList,
                    subject: 'Voting on an objection has ended',
                    text: `
          An objection in your asscoation has reached the end of the voting period.
          To view the results please use the following link:
          ${link}
          `,
                    html: `
          <p>An objection in your asscoation has reached the end of the voting period.</p>
          <p>To view the results click <a href="${link}">here</a></p>
          <p>or use the following link:</p>
          <p>${link}</p>
          `,
                });
                objection.closedAt = new Date();
                objection.save();
            }));
        });
    });
});
//# sourceMappingURL=objectionsOver.js.map