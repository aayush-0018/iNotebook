const mongoose = require("mongoose");
const connectMongo = () => {
  mongoose
    .connect(
      "mongodb+srv://Aayush0018:@cluster0.ne3b9v4.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0"
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    )
    .then(() => {
      console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch((err) => {
      console.log("OH NO MONGO CONNECTION ERROR!!!!");
      console.log(err);
    });
};
module.exports = connectMongo;
