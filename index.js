const app = require("./app");
require("dotenv").config();

// database connection :-
require("./config/database").dbConnect();

const port = process.env.PORT || 1200;
const environment = process.env.NODE_ENV;
app.listen(port, () => {
  console.log(`Server started at ${port} in ${environment} mode`);
});
