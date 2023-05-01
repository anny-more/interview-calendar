import {Request, Response} from 'express';
import {z} from 'zod';
import {db} from '../db';
import {timeSlots} from '../const';
import {ApiError} from '../service/api.error';

const DateSchema = z.object({
    date_interview: z.date(),
    slot: z.enum(timeSlots),
});

class SlotsController {
    async createSlot(req: Request, res: Response, next: Function) {
        const {date_interview, slot} = req.body;
        DateSchema.safeParse({date_interview: new Date(date_interview), slot});
        const data = `${date_interview} ${slot}`;
        try {
            const newSlot = await db.query(
                'INSERT INTO slots (date_interview) values($1) RETURNING *',
                [data]
            );
            res.status(200).json(newSlot.rows[0]);
        } catch (error) {
            next(ApiError.badRequest(`${error}`));
        }
    }
    async getAllSlots(req: Request, res: Response, next: Function) {
        try {
            const result = await db.query('SELECT * FROM slots');
            res.status(200).json(result.rows);
        } catch (error) {
            next(ApiError.badRequest(`${error}`));
        }
    }
    async getSlot(req: Request, res: Response) {
        const {date_interview, slot} = req.body;
        DateSchema.parse({date_interview: new Date(date_interview), slot});
        const data = `${date_interview} ${slot}`;
        const result = await db.query(
            'SELECT * FROM slots WHERE date_interview = $1',
            [data]
        );
        res.json(result);
    }
    async deleteSlot(req: Request, res: Response, next: Function) {
        try {
            const {date_interview, slot} = req.body;
            DateSchema.parse({date_interview: new Date(date_interview), slot});
            const data = `${date_interview} ${slot}`;
            await db.query('DELETE FROM slots WHERE date_interview = $1', [
                data,
            ]);
            res.status(200).json('ok');
        } catch (error) {
            next(ApiError.badRequest(`${error}`));
        }
    }
}

export default new SlotsController();
