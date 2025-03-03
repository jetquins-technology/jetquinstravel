// lib/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI; 
// const MONGODB_DB = process.env.MONGODB_DB; 

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoClient is not constantly re-initialized during hot reloading
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGODB_URI).then((client) => {
      return client;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to directly call MongoClient.connect
  clientPromise = MongoClient.connect(MONGODB_URI).then((client) => {
    return client;
  });
}

export default clientPromise;
