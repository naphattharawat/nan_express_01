import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ItemModel } from '../models/item';
import { AddressModel } from '../models/address';


const addressModel: AddressModel = new AddressModel();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Hello world', code: HttpStatus.OK });
});


router.get('/changwat', async (req: Request, res: Response) => {
  try {
    const rs = await addressModel.getProvince(req.db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: true, error: error });
  }
});

router.get('/ampur', async (req: Request, res: Response) => {
  try {
    const changwatCode = req.query.changwatCode;
    const rs = await addressModel.getAmpur(req.db, changwatCode);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: true, error: error });
  }
});

router.get('/tambon', async (req: Request, res: Response) => {
  try {
    const changwatCode = req.query.changwatCode;
    const ampurCode = req.query.ampurCode;
    const rs = await addressModel.getTambon(req.db, changwatCode,ampurCode);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: true, error: error });
  }
});


export default router;