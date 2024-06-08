import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import connectToDB from "./config/dbConfig.js";
import userRouter from "./routes/user.route.js";

const app = express();

const corsConfig = {
    exposedHeaders: ['Authorization']
};
app.use(cors(corsConfig));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    return res.status(200).send({ message: 'API is working' });
});

// Routes

app.use('/api/auth', userRouter);


// Connect to the database
connectToDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
