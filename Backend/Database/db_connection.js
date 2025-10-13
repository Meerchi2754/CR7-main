const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URL, {
      dbName: "Course_recommedation"
    })
    .then(() => {
      console.log("Connected Successfully to Database");
      resolve();
    })
    .catch(err => {
      console.log(err);
      console.log(`Error in connecting to DB:${err}`);
      reject(err);
    });
  });
};

const getDB = () => {
  if (!mongoose.connection.readyState) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return mongoose.connection.db;
};

module.exports = { connectDB, getDB };
