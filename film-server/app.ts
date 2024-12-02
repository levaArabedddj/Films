import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import router from './router';
import errorMiddleware from './middlewares/error-middleware';
import prisma from './prisma/prismaClient';

const port = process.env.PORT 
const app: Application = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try{
        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    }catch(error){
        console.error(error)
        await prisma.$disconnect()
    }
}


start()