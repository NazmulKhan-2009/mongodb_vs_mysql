// require("dotenv").config();
// const mongoose=require('mongoose')


// const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnbwm.mongodb.net/store?retryWrites=true&w=majority`
// // const uri="mongodb://localhost:27017/store?retryWrites=true&w=majority"


// module.exports = async function connection() {
//  try {
//      const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//      };
//      await mongoose.connect(uri, connectionParams);
//      console.log("connected to database");
//  } catch (error) {
//      console.log(error);
//      console.log("could not connect to database");
//  }
// };
