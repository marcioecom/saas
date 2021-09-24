import express from "express";
import 'dotenv/config'

const port = process.env.PORT
const app = express();

app.get('/', (req, res) => {
  return res.json({
    message: "Ok"
  })
})

app.listen(port, () => console.log(`Server listenning on ${port}`));
