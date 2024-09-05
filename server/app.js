import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

import dbConnection from './db/dbConnection.js';
import employeeRouter from './routes/employeeRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express();

//CORS Policies
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
}
));

//essential middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for managing models
app.use('/employee', employeeRouter);
app.use('/user', userRouter)


app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server running on port: ${process.env.PORT}`);
    } else {
        console.log(`Error: ${error}`);
    }
});
dbConnection();