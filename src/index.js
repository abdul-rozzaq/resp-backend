import express from 'express';
import { create } from 'express-handlebars';

import path from 'path';
import ApisController from './controllers/apis.js';

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 4100
const app = express();

const hbs = create({
    defaultLayout: "main",
    extname: "hbs"
})


const logger = (req, res, next) => {
    const now = new Date();
    const timestamp = now.toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${timestamp}] [${method}] ${url}`);

    return next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, '..', 'views'))

app.use(logger, ApisController)


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));