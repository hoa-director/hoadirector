"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const emailer_1 = require("../classes/emailer");
class EmailerFactory {
    static createEmailer() {
        const transporter = EmailerFactory.getTransporter();
        const emailer = new emailer_1.Emailer(transporter);
        return emailer;
    }
    static getTransporter() {
        return nodemailer_1.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
}
exports.EmailerFactory = EmailerFactory;
//# sourceMappingURL=emailer-factory.js.map