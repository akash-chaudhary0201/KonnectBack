const mongoose = require("mongoose");

exports.dbConnect = () => {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then((con) => {
      console.log(`Database connected`);
    })
    .catch((error) => {
      console.log("Error in Connecting to database", error);
      process.exit(1);
    });
};
