import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default connection;
