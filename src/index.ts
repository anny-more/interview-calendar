import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/slots.routes';
import {errorHandler} from './service/error.hadler';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(3001, () => console.log('server listen on port 3001'));
