import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import routes from './routes/routes'
import cors from 'cors';

require('dotenv').config()

const app = express();
const PORT = process.env.SERVERPORT;


// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOINSTANCE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//  bodyparser setup
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

//  CORS
app.use(cors());


routes(app);

app.get('/', (req, res) => 
res.send(`running on ${PORT}`)

);


app.listen(PORT, () => 
console.log(`Your server is running on port ${PORT}`) )