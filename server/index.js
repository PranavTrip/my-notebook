const express = require("express");
const connectToMongo = require("./db");

connectToMongo();
const PORT = 5000;
const app = express();
app.use(express.json());

// Available Routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
