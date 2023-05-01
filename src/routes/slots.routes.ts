import {Router} from 'express';
import SlotsController from '../controller/slots.controller';

const router: Router = Router();

router.get('/allSlots', SlotsController.getAllSlots);
router.post('/addSlot', SlotsController.createSlot);
router.delete('/deleteSlot', SlotsController.deleteSlot);

export default router;
