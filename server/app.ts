import express from "express";
import cors from "cors";
import { save, read } from './lib/db'
import _ from 'lodash'

const PORT = 8080;
const app = express();
const database = { data: "Hello World" };

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  const data = req.body.data;
  database.data = data;
  save(data);
  res.sendStatus(200);
});

app.get('/verify', async (req, res) => {
  let remoteData: any = {}
  try {
    remoteData = await read();
  } catch (e) { }
  const localData = await database.data;
  let tampered = false
  if (!_.isEqual(remoteData, localData)) {
    tampered = true
    database.data = remoteData
  }
  res.json({ tampered, remoteData, localData })
  // for sake of testing, I have expose data and display in client
  // however, this happends without letting user know and alert to administrator for necessary action
})

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
