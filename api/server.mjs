import express from "express";
import bodyParser from 'body-parser';
import libraryRoutes from "./routes/library.mjs";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(libraryRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
