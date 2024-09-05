import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

import dbConnection from './db/dbConnection.js';

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


app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server running on port: ${process.env.PORT}`);
    } else {
        console.log(`Error: ${error}`);
    }
});
dbConnection();