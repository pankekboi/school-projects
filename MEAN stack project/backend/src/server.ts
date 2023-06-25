import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import receiptRouter from './routers/receipt.routes';
import userRouter from './routers/user.routes';
import buyersRouter from './routers/buyers.routes';
import categoriesRouter from './routers/categories.routes';
import requestRouter from './routers/request.routes';
import tableRouter from './routers/table.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fiscalization');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/receipts', receiptRouter);
router.use('/users', userRouter);
router.use('/buyers', buyersRouter);
router.use('/categories', categoriesRouter);
router.use('/requests', requestRouter);
router.use('/tables', tableRouter);

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));