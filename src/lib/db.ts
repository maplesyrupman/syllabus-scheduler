import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;

export default async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(process.env.MONGODB_URI as string);

  await client.connect();

  const db = client.db('syllabus-scheduler');
  cachedDb = db;
  return db;
}