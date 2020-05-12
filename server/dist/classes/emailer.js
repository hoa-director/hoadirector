"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emailer {
    constructor(transporter) {
        this.developmentModeMessage = `
    This message was sent from a development or staging server and should not have been sent to any users.
    If you have recieved this message please send an email to ${process.env.DEVELOPER_EMAIL}`;
        console.log('testing transport');
        transporter.verify((error) => {
            if (error) {
                console.log(error);
                throw new Error('transporter failed');
            }
            else {
                console.log('Server is ready to take our messages');
            }
        });
        this.transporter = transporter;
    }
    // options should be of type SendMailOptions
    sendMail(options) {
        if (process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'staging') {
            options.to = process.env.DEVELOPER_EMAIL;
            options.cc = process.env.DEVELOPER_EMAIL;
            options.bcc = process.env.DEVELOPER_EMAIL;
            options.text += this.developmentModeMessage;
            options.html += this.developmentModeMessage;
        }
        this.transporter.sendMail(options);
    }
}
exports.Emailer = Emailer;
//# sourceMappingURL=emailer.js.map