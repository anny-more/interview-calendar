import {Pool} from 'pg';

export const db = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'date_interview',
});
