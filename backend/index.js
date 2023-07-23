import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import studentRoutes from './routes/studentRoutes.js';
import firestoreDB from './firestoreConfig.js';

// Configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Routes
app.use('/api/v1/', studentRoutes);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
