import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { Association, Document, Objection, User, Vote } from '../schema/schemas';
import { Unit } from '../schema/unit';
import { Emailer } from '../classes/emailer';
import { Transporter, createTransport } from 'nodemailer';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/documents', this.getDocumnets);
    this.router.get('/documents/:id', this.viewDocument);
    this.router.get('/directory', this.getDirectory);
    this.router.get('/rules', this.getRules);
    this.router.get('/units', this.getUnits);
    this.router.get('/objections', this.getObjections);
    this.router.get('/objections/expired', this.getExpiredObjections);
    this.router.get('/objections/:id', this.getObjection);
    this.router.get('/inbox', this.getInbox);
    this.router.get('/outbox', this.getOutbox);
    this.router.post('/objections', this.fileObjection);
    this.router.post('/vote', this.submitVote);
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    });
  }

  private getDocumnets = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Document.getDocumentsByAssociation(associationId).then(documents => {
      res.send(documents);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private getDirectory = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Association.getDirectoryByAssociationId(associationId).then(directory => {
      res.send(directory);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private viewDocument = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId || 1;
    const documentId = req.params.id;
    Document.getDocumentByAssociationAndId(associationId, documentId).then((document: any) => {
      var data =fs.readFileSync(path.join(__dirname, '..', document.dataValues.path));
      res.contentType("application/pdf");
      res.header('Content-Disposition', 'inline; name=' + document.name);
      res.send(data);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private getRules = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Association.getRuleListsByAssociationId(associationId).then(ruleLists => {
      res.send(ruleLists);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private fileObjection = (req: Request, res: Response, next: NextFunction) => {
    const objection = req.body.objection;
    const by = req.user.id;
    const associationId = req.session.associationId;
    Objection.create({
      associationId,
      comment: objection.comment,
      submittedByUserId: by,
      submittedAgainstUserId: objection.against
    }).then((objection) => {
      const transporter: Transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
      });
      const emailer = new Emailer(transporter);
      console.log(emailer);
      Association.getUsersByAssociationId(associationId).then(users => {
        const emails = users.map(user => user.email);
        const emailList = emails.join(', ');
        emailer.sendMail({
          from: process.env.EMAIL_FROM,
          to: emailList,
          subject: 'A new objection has been submitted on HOA director',
          text: 
            `
              A new objection has been submitted by ${req.user.name}
              To view the objection please use the following link: hoadirector.com/objection/view/${objection.id}
            `,
          html: 
            `
              <p>A new objection has been submitted by ${req.user.name}</p>
              <p>To view the objection click <a href="hoadirector.com/objection/view/${objection.id}">here</a></p>
            `
        });
      });
      res.sendStatus(200);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  private submitVote = (req: Request, res: Response, next: NextFunction) => {
    const objectionId: number = parseInt(req.body.vote.objectionId);
    const approved: number = parseInt(req.body.vote.approved);
    const annonymous: number = req.body.annonymous ? parseInt(req.body.annonymous) : 0;
    const userId: number = parseInt(req.user.id);
    Vote.create({
      objectionId,
      approved,
      annonymous,
      userId,
    }).then(vote => {
      res.sendStatus(200);
    }).catch(error => {
      if (error.id === 100) {
        res.status(400).send({message: error.message});
        return;
      }
      console.error(error);
      res.sendStatus(500);
    });
  };
  /**
   * Get objections for the users asscoiation
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private getObjections = (req: Request, res: Response, next: NextFunction) => {
    const associationId: number = parseInt(req.session.associationId);
    Association.findById(associationId).then(association => {
      association.getActiveObjections().then(objections => {
        res.send({ objections });
      }).catch(error => {
        console.log(error);
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
  private getInbox = (req: Request, res: Response, next: NextFunction) => {
    const associationId: number = parseInt(req.session.associationId);
    const userId: number = parseInt(req.user.id);
    Association.findById(associationId).then(association => {
      association.getUserInbox(userId).then(objections => {
        res.send({ objections });
      }).catch(error => {
        console.log(error);
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
  private getOutbox = (req: Request, res: Response, next: NextFunction) => {
    const associationId: number = parseInt(req.session.associationId);
    const userId: number = parseInt(req.user.id);
    Association.findById(associationId).then(association => {
      association.getUserOutbox(userId).then(objections => {
        res.send({ objections });
      }).catch(error => {
        console.log(error);
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
  private getExpiredObjections = (req: Request, res: Response, next: NextFunction) => {
    const associationId: number = parseInt(req.session.associationId);
    Association.findById(associationId).then(association => {
      association.getExpiredObjections().then(objections => {
        res.send({ objections });
      }).catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
    });
  };

  /**
   * Get specific for the users asscoiation
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private getObjection(req: Request, res: Response, next: NextFunction) {
    const associationId: number = parseInt(req.session.associationId);
    const objectionId: number = parseInt(req.params.id);
    Objection.findById(objectionId).then(objection => {
      res.send({ objection });
    }).catch(error => {
      res.sendStatus(500);
    });
  };

  /**
   * Get specific for the users asscoiation
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private getUnits(req: Request, res: Response, next: NextFunction) {
    const associationId: number = parseInt(req.session.associationId);
    Association.findById(
      associationId,
      {
        attributes: [],
        include: [
          {
            model: Unit,
            as: 'units',
            attributes: ['userId', 'addressLineOne']
          }
        ]
    }).then(association => {
      res.send({units: association.units});
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
};

const apiRoutes = new ApiRouter().router;

export default apiRoutes;
