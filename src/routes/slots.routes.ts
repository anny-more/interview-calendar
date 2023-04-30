import {Router} from 'express';
import SlotsController from '../controller/slots.controller';

const router: Router = Router();

router.get('/allSlots', SlotsController.getAllSlots);
router.get('/getSlot/:id', SlotsController.getSlot);
router.post('/addSlot/', SlotsController.createSlot);
router.delete('/deleteSlot/:id', SlotsController.deleteSlot);

export default router;
