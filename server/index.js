import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import connectToDB from "./config/dbConfig.js";

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


// Connect to the database
connectToDB();

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
