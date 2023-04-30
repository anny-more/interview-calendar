import {Request, Response} from 'express';
import {z} from 'zod';
import {db} from '../db';

const DateSchema = z.object({
    date_interview: z.date(),
    slot: z.enum([
        '0:00',
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
    ]),
});

class SlotsController {
    async createSlot(req: Request, res: Response) {
        const {date_interview, slot} = req.body;
        console.log('data', date_interview, slot);
        DateSchema.parse({date_interview: new Date(date_interview), slot});
        try {
            const newSlot = await db.query(
                'INSERT INTO slots (date_interview) values($1) RETURNING *',
                [`${date_interview} ${slot}`]
            );
            console.log(newSlot.rows[0]);
            res.json({message: 'ok'});
        } catch (error) {
            console.log(error);
        }
    }
    async getAllSlots(req: Request, res: Response) {
        const result = await db.query('SELECT * FROM slots');
        res.json(result.rows);
    }
    async getSlot(req: Request, res: Response) {
        const {date_interview, slot} = req.body;
        const result = await db.query(
            'SELECT * FROM slots WHERE date_interview = $1 AND slot = $2',
            [date_interview, slot]
        );
        res.json(result);
    }
    async deleteSlot(req: Request, res: Response) {
        const {date_interview, slot} = req.body;
        await db.query(
            'DELETE FROM slots WHERE date_interview = $1 AND slot = $2',
            [date_interview, slot]
        );
        res.json('ok');
    }
}

export default new SlotsController();
