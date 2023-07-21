import express from "express"; // ESModules
require("../mongo");

import characterRouter from "./routes/characters";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = process.env.PORT;

// el guion bajo es para no usarla.
app.get("/", (_req, res) => {
  console.log("someone pinged here!!");
  res.send("Bienvenido a la api de valorant. Accede a /api/characters");
});

app.use("/api/characters", characterRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
