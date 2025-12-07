import MongoStore from "rate-limit-mongo";
import dotenv from "dotenv";

dotenv.config();

// Create a shared MongoStore configuration to avoid circular dependency issues
const mongoStore = (collectionName, expireTimeMs = 24 * 60 * 60 * 1000) => {
  try {
    return new MongoStore({
      uri: process.env.MONGODBURI,
      collectionName,
      expireTimeMs,
      resetExpireDateOnChange: false,
      // Prevent circular references in serialization
      errorHandler: (err) => {
        console.warn(`MongoStore ${collectionName} error:`, err.message);
      },
    });
  } catch (error) {
    console.error(`Failed to create MongoStore for ${collectionName}:`, error.message);
    return undefined;
  }
};

export { mongoStore };
