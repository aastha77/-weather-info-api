const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use("/api", require("./routes/weatherRoutes"));

app.get("/", (req, res) => {
  res.send(" Weather API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
