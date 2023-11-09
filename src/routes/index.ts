import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ItemModel } from '../models/item';
import { RegisterModel } from '../models/register';
import * as crypto from 'crypto';

const itemModel: ItemModel = new ItemModel();
const registerModel: RegisterModel = new RegisterModel();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    if (username && password && firstName && lastName) {
      let encPassword = crypto.createHash('md5').update(password).digest('hex');
      await registerModel.registerUser(req.db, username, encPassword, firstName, lastName);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    res.send({ ok: false, error: error.message })
  }
});


export default router;