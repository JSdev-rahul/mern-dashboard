const mongoose = require("mongoose");


const Connection = () => {
    const mongUrl =
  "mongodb://rahulchoudhary:cTPLtTRrEAFcbo4o@ac-v9gs7mx-shard-00-00.ezp1tyf.mongodb.net:27017,ac-v9gs7mx-shard-00-01.ezp1tyf.mongodb.net:27017,ac-v9gs7mx-shard-00-02.ezp1tyf.mongodb.net:27017/?ssl=true&replicaSet=atlas-10pyex-shard-0&authSource=admin&retryWrites=true&w=majority";

  mongoose.connect(mongUrl);

  mongoose.connection.on("connected", () => {
    console.log("database connected successfully");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("database disconnected ");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error in database connection", err.message);
  });
};

module.exports = Connection;
