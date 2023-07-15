import mongoose from "mongoose";

async function getMongodbClient() {
  const db = await mongoose.connect(String(process.env.MONGOOSE_URL));
  return db.connection;
}

export default getMongodbClient;
