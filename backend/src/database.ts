import mongoose from 'mongoose';

export async function startConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/api');
    console.log('Database is connected');
  } catch (err) {
    console.error('Unable to connect to the server. Please start the server. Error:', err);
  }
}