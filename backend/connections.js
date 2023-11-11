const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODB_URL;

main()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(URI);
}
module.exports = main;
