require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const statusRoute = require("./routes/status");
app.use("/api", statusRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});