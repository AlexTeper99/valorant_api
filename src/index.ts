import express from "express";
require("../mongo");

import characterRouter from "./routes/characters";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  console.log("someone pinged here!!");
  res.send(
    "Welcome to my Valorant Api. Access to /api/characters or to /api/characters/:id"
  );
});

app.use("/api/characters", characterRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
