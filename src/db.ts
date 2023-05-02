import {Pool} from 'pg';
import {config} from 'dotenv';

config();

const connectionString =
    'postgres://root:prSVDHZF9uP5hSZHFrqvnYT4QuIIySUP@dpg-ch7sjvtgk4q7lmu3fsmg-a.frankfurt-postgres.render.com/slots';

export const db = new Pool({
    connectionString,
});

/*let param = {
    user: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    host: process.env.POSTGRES_URL || 'localhost',
    port: 5432,
    database: 'date_interview',
};*/
