import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.7yltj9r.mongodb.net/hiring-test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
