import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';
import router from './routes/slots.routes';
import {errorHandler} from './service/error.hadler';

config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server listen on port ' + PORT));
