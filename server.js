const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/signup", (req, res) => {
  res.send("App running");
});


// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/currency", require("./routes/currency"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
