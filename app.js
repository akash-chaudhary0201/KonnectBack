const express = require("express");
const app = express();
const cors = require("cors");
const cookierParser = require("cookie-parser");
app.use(cookierParser());
const jwt = require("jsonwebtoken");

app.use(express.json());

const allowedOrigins = [
  "https://konnect-front.vercel.app",
  "http://localhost:5173/",
];
const corsOption = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOption));

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
