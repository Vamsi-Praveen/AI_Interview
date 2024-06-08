import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import connectToDB from "./config/dbConfig.js";
import userRouter from "./routes/user.route.js";
import questionRouter from "./routes/questions.route.js";

const app = express();

const corsConfig = {
    exposedHeaders: ['Authorization']
};
app.use(cors(corsConfig));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    return res.status(200).send({ message: 'API is working' });
});

//test authorization request
app.get('/api/test-auth', async (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    res.status(200).json("OK");
})

// Routes

app.use('/api/auth', userRouter);

app.use('/api', questionRouter)


// Connect to the database
connectToDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
