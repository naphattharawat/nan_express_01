import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ItemModel } from '../models/item';


const itemModel: ItemModel = new ItemModel();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Hello world', code: HttpStatus.OK });
});

router.get('/item-type', async (req: Request, res: Response) => {
  const rs = await itemModel.getItemType(req.db);
  res.send({ ok: true, rows: rs });
});

router.get('/item-group-all', async (req: Request, res: Response) => {
  try {
    // const id = req.query.id;
    if (true) {
      const rs = await itemModel.getItemGroupALL(req.db);
      res.send({ ok: true, rows: rs });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });

  }
});
router.get('/item-group', async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (id) {
      const rs = await itemModel.getItemGroup(req.db, id);
      res.send({ ok: true, rows: rs });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });

  }
});

//SAVE INSERT CREATE
router.post('/item-group', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data) {
      const obj = {
        "id": data.id,
        "name": data.name,
        "itype_id": data.itype_id
      }
      await itemModel.saveItemGroup(req.db, obj);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    console.log(error);

    if (error.message.sqlMessage) {
      res.send({ ok: false, error: error.message.sqlMessage });
    } else {
      res.send({ ok: false, error: error.message });
    }
  }
});

router.put('/item-group', async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const data = req.body;
    if (id && data) {
      const obj = {
        "id": data.id,
        "name": data.name,
        "itype_id": data.itype_id
      }
      await itemModel.updateItemGroup(req.db, obj, id);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.delete('/item-group', async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (id) {
      const rs = await itemModel.deleteItemGroup(req.db, id);
      res.send({ ok: true, rows: rs });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' })
    }
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});



export default router;