import {Request, Response} from 'express';
import {z} from 'zod';
import {timeSlots} from '../const';
import {ApiError} from '../service/api.error';
import {Client, Pool} from 'pg';
import {config} from 'dotenv';

config();

const connectionString =
    'postgres://root:prSVDHZF9uP5hSZHFrqvnYT4QuIIySUP@dpg-ch7sjvtgk4q7lmu3fsmg-a.frankfurt-postgres.render.com/slots';

const db = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
db.connect();

const DateSchema = z.object({
    date_interview: z.date(),
    slot: z.enum(timeSlots),
});

class SlotsController {
    async createSlot(req: Request, res: Response) {
        try {
            const {date_interview, slot} = req.body;
            DateSchema.parse({date_interview: new Date(date_interview), slot});
            const data = `${date_interview} ${slot}`;
            const newSlot = await db.query(
                'INSERT INTO slots (date_interview) VALUES ($1) RETURNING *',
                [data]
            );
            res.status(200).json(newSlot.rows[0]);
        } catch (error) {
            res.status(400).json('error');
            ApiError.badRequest(`${error}`);
        }
    }
    async getAllSlots(req: Request, res: Response) {
        db.query('SELECT * FROM slots')
            .then(res => console.log('data', res.rows))
            .catch(err => console.error('Error executing query', err.stack));
        try {
            const result = await db.query('SELECT * FROM slots');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(400).json('error');
            ApiError.badRequest(`${error}`);
        }
    }
    async deleteSlot(req: Request, res: Response) {
        try {
            const {date_interview, slot} = req.body;
            DateSchema.parse({date_interview: new Date(date_interview), slot});
            const data = `${date_interview} ${slot}`;
            await db.query('DELETE FROM slots WHERE date_interview = $1', [
                data,
            ]);
            res.status(200).json('ok');
        } catch (error) {
            ApiError.badRequest(`${error}`);
        }
    }
}

export default new SlotsController();
