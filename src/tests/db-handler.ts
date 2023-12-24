import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
mongoose.disconnect()

let mongo: MongoMemoryServer | null = null;

const connectDB = async (): Promise<void> => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

const dropDB = async (): Promise<void> => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async (): Promise<void> => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
};

export { connectDB, dropDB, dropCollections };
