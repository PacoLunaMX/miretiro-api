import mongoose from 'mongoose';

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/testDB');
});

beforeEach(async () => {
  // Clear the test database or perform setup steps
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  // Close the test database connection
  await mongoose.connection.close();
});