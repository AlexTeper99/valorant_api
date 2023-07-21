import express from "express"; // ESModules
// const express = require('express') -> commonjs
// import "dotenv/config";

require("../mongo");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = process.env.PORT;

app.get("/ping", (_req, res) => {
  // el guion bajo es para no usarla.
  console.log("someone pinged here!!");
  res.send("ponga");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
