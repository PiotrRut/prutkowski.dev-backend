const mongoose = require("mongoose");

/**
 * Connect to and initialise a MongoDB instance
 */
const mongoInit = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB connection initialised 🔗"))
    .catch((error) => console.log(error));
};

exports.mongoInit = mongoInit;
