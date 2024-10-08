const express = require("express");
const app = express();
const cors = require("cors");
const cookierParser = require("cookie-parser");
app.use(cookierParser());

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// importing all routes :-
const auth = require("./routes/authRoute");
const post = require("./routes/postRoute");
const comment = require("./routes/commentRoute");
app.use("/kt", auth);
app.use("/kt", post);
app.use("/kt", comment);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

module.exports = app;
