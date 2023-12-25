const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbHandler = require('../db-handler');
const request = require("supertest")
import app from '../../index'; 

import mongoose from 'mongoose';
import User from '../../models/User'

mongoose.disconnect()
beforeAll(async () => {
    await dbHandler.connectDB();
  });
   
afterAll(async () => {
    await dbHandler.dropDB();
  });
   
afterEach(async () => {
    await dbHandler.dropCollections();
  });


  describe("User Model", () => {
    it("should create a user successfully", async () => {
      let validUser = {
        username: "example1",
        email: "test@example.com",
        password: "password"
      };
      const newTodo = new User(validUser);
      await newTodo.save();
      expect(newTodo._id).toBeDefined();
      expect(newTodo.username).toBe(validUser.username);
      expect(newTodo.password).toBe(validUser.password);
      expect(newTodo.email).toBe(validUser.email);
    });

  });


describe('User API', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
      };
  
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
  
      expect(response.body).toHaveProperty('_id');
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
    });

    it('should fail at register a new user', async () => {
        const userData = {
          username: 'testUser',
          password: 'password123',
        };
    
        const response = await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(401);
    
        
      });
  
    it('should login a user', async () => {
      const userData = {
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
          };
      
      const response1 = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201);
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };
  
      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);
  
      expect(response.body).toHaveProperty('token');
      
    });
  
    
  });