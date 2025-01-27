import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/users', userRoutes)

app.get('/', (req,res)=>{
    res.send('Server is ready');
})

//middleware Error
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT}`)
})

