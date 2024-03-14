                               The Acme Store API
     Overview
Welcome to The Acme Store API! This API allows users to interact with a database to set their favorite products. It provides RESTful endpoints for managing users, products, and favorites.
Project Structure
      This project follows a specific structure:
* server/index.js: This file contains the Express application and setup functions, including the initialization function (init).
* server/db.js: This file serves as the data layer, exporting methods for interacting with the database.
      Data Layer (server/db.js)
The data layer provides methods to interact with the database:
* client: A node pg client for database operations.
* createTables: Drops and creates the tables for the application.
* createProduct: Creates a product in the database and returns the created record.
* createUser: Creates a user in the database with a hashed password and returns the created record.
* fetchUsers: Returns an array of users in the database.
* fetchProducts: Returns an array of products in the database.
* fetchFavorites: Returns an array of favorites for a user.
* createFavorite: Creates a favorite in the database and returns the created record.
* destroyFavorite: Deletes a favorite from the database.
     Express Application (server/index.js)
The Express application provides RESTful routes for interacting with the API:
* GET /api/users: Returns an array of users.
* GET /api/products: Returns an array of products.
* GET /api/users/:id/favorites: Returns an array of favorites for a user.
* POST /api/users/:id/favorites: Creates a favorite for a user with the specified product ID and returns the created favorite with a status code of 201.
* DELETE /api/users/:userId/favorites/:id: Deletes a favorite for a user and returns nothing with a status code of 204.
       Database Schema
The database schema consists of three tables:
User
* id (UUID)
* username (STRING, UNIQUE)
* password (STRING, UNIQUE)
Product
* id (UUID)
* name (STRING)
Favorite
* id (UUID)
* product_id (UUID, REFERENCES products table, NOT NULL)
* user_id (UUID, REFERENCES users table, NOT NULL)

