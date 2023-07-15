import mongoose from "mongoose";

async function getMongodbClient() {
  // TODO: Remove mongodb and use mongoose entirely
  // const client: MongoClient = new MongoClient(String(process.env.MONGO_URL));
  const db = await mongoose.connect(String(process.env.MONGOOSE_URL));
  // await client.connect();
  // const db = client.db(config.mongo.dbName);

  return db.connection;
}

export default getMongodbClient;
