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
const express_1 = require("express");
const nodemailer_1 = require("nodemailer");
const emailer_1 = require("../classes/emailer");
const schemas_1 = require("../schema/schemas");
const unit_1 = require("../schema/unit");
const documents_1 = require("./api/documents");
const bugsnag_1 = require("../config/bugsnag");
const documentsRoutes = new documents_1.DocumentsRouter();
class ApiRouter {
    constructor() {
        this.getDirectory = (req, res, next) => {
            const associationId = req.session.associationId;
            schemas_1.Association.getDirectoryByAssociationId(associationId)
                .then((directory) => {
                res.send(directory);
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        };
        this.getRules = (req, res, next) => {
            const associationId = req.session.associationId;
            schemas_1.Association.getRuleListsByAssociationId(associationId)
                .then((ruleLists) => {
                res.send(ruleLists);
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        };
        this.fileObjection = (req, res, next) => {
            const associationId = req.session.associationId;
            const objection = req.body.objection;
            const byId = req.user.id;
            schemas_1.Objection.create({
                associationId,
                comment: objection.comment,
                submittedByUserId: byId,
                submittedAgainstUserId: objection.against,
            })
                .then((filedObjection) => {
                res.status(200).send({ success: true });
                // TODO: move this to a factory
                const transporter = nodemailer_1.createTransport({
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT, 10),
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                });
                const emailer = new emailer_1.Emailer(transporter);
                return schemas_1.Association.getUsersByAssociationId(associationId).then((users) => {
                    const emails = users.map((user) => user.email);
                    const emailList = emails.join(', ');
                    return emailer.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: emailList,
                        subject: 'A new objection has been submitted on HOA director',
                        text: `
              A new objection has been submitted by ${req.user.name}
              To view the objection please use the following link: hoadirector.com/resolution-center/objection/view/${filedObjection.id}
            `,
                        html: `
              <p>A new objection has been submitted by ${req.user.name}</p>
              <p>To view the objection click <a href="hoadirector.com/objection/view/${filedObjection.id}">here</a></p>
              <p>Or copy and paste the following link into your web browser:</p>
              <p>hoadirector.com/resolution-center/objection/view/${filedObjection.id}</p>
            `,
                    });
                });
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        };
        this.submitVote = (req, res, next) => {
            // TODO: confirm user is in association
            // TODO: user more consise + type conversion
            const objectionId = parseInt(req.body.vote.objectionId);
            const approved = parseInt(req.body.vote.approved);
            const annonymous = req.body.annonymous
                ? parseInt(req.body.annonymous)
                : 0;
            const userId = parseInt(req.user.id);
            schemas_1.Vote.create({
                objectionId,
                approved,
                annonymous,
                userId,
            })
                .then((vote) => {
                res.status(200).send({});
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                if (error.id === 100) {
                    res.status(400).send({ message: error.message });
                    return;
                }
                res.sendStatus(500);
            });
        };
        /**
         * Get objections for the users asscoiation
         * @param {Request} req
         * @param {Response} res
         * @param {NextFunction} next
         */
        this.getObjections = (req, res, next) => {
            const associationId = parseInt(req.session.associationId);
            schemas_1.Association.findByPk(associationId).then((association) => {
                association
                    .getActiveObjections()
                    .then((objections) => {
                    res.send({ objections });
                })
                    .catch((error) => {
                    bugsnag_1.bugsnagClient.notify(error);
                    res.sendStatus(500);
                });
            });
        };
        /**
         * Get objections for the users asscoiation
         * @param {Request} req
         * @param {Response} res
         * @param {NextFunction} next
         */
        this.getInbox = (req, res, next) => {
            const associationId = parseInt(req.session.associationId);
            const userId = parseInt(req.user.id);
            schemas_1.Association.findByPk(associationId).then((association) => {
                association
                    .getUserInbox(userId)
                    .then((objections) => {
                    res.send({ objections });
                })
                    .catch((error) => {
                    bugsnag_1.bugsnagClient.notify(error);
                    res.sendStatus(500);
                });
            });
        };
        /**
         * Get objections for the users asscoiation
         * @param {Request} req
         * @param {Response} res
         * @param {NextFunction} next
         */
        this.getOutbox = (req, res, next) => {
            const associationId = parseInt(req.session.associationId);
            const userId = parseInt(req.user.id);
            schemas_1.Association.findByPk(associationId).then((association) => {
                association
                    .getUserOutbox(userId)
                    .then((objections) => {
                    res.send({ objections });
                })
                    .catch((error) => {
                    bugsnag_1.bugsnagClient.notify(error);
                    res.sendStatus(500);
                });
            });
        };
        /**
         * Get expired for the users asscoiation
         * @param {Request} req
         * @param {Response} res
         * @param {NextFunction} next
         */
        this.getPastObjections = (req, res, next) => {
            const associationId = parseInt(req.session.associationId);
            schemas_1.Association.findByPk(associationId).then((association) => {
                association
                    .getPastObjections()
                    .then((objections) => {
                    res.send({ objections });
                })
                    .catch((error) => {
                    bugsnag_1.bugsnagClient.notify(error);
                    res.sendStatus(500);
                });
            });
        };
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.use(documentsRoutes.routePrefix, documentsRoutes.router);
        this.router.get('/directory', this.getDirectory);
        this.router.get('/rules', this.getRules);
        this.router.get('/units', this.getUnits);
        this.router.get('/objections', this.getObjections);
        this.router.get('/objections/past', this.getPastObjections);
        this.router.get('/objections/:id', this.getObjection);
        this.router.get('/inbox', this.getInbox);
        this.router.get('/outbox', this.getOutbox);
        this.router.post('/objections', this.fileObjection);
        this.router.post('/vote', this.submitVote);
        this.router.get('/', (req, res, next) => {
            res.sendStatus(200);
        });
    }
    /**
     * Get specific for the users asscoiation
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    getObjection(req, res, next) {
        const associationId = parseInt(req.session.associationId);
        const objectionId = parseInt(req.params.id);
        schemas_1.Objection.findByPk(objectionId, {
            where: {
                associationId,
            },
            attributes: ['comment', 'closedAt', 'associationId', 'id'],
            include: [
                {
                    model: schemas_1.User,
                    as: 'submittedBy',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
                {
                    model: schemas_1.User,
                    as: 'submittedAgainst',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
            ],
        })
            .then((objection) => __awaiter(this, void 0, void 0, function* () {
            const canVote = yield objection.userCanVote(req.user);
            let results;
            if (objection.closedAt) {
                results = yield objection.getResults();
            }
            res.send({ objection, canVote, results });
        }))
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.status(500).send({ error });
        });
    }
    /**
     * Get specific for the users asscoiation
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    getUnits(req, res, next) {
        const associationId = parseInt(req.session.associationId);
        schemas_1.Association.findByPk(associationId, {
            attributes: [],
            include: [
                {
                    model: unit_1.Unit,
                    as: 'units',
                    attributes: ['userId', 'addressLineOne'],
                },
            ],
        })
            .then((association) => {
            res.send({ units: association.units });
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.sendStatus(500);
        });
    }
}
exports.ApiRouter = ApiRouter;
const apiRoutes = new ApiRouter().router;
exports.default = apiRoutes;
//# sourceMappingURL=api.js.map