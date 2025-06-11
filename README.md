# REAL ESTATE BACKEND API
A RESTFUL API for managing real estate properties,agent and users

# Overview
This  is an early-stage backend application developed using Node.js and MongoDB. It serves as the foundational backend for a real estate platform, focusing on user authentication and property management.

# Key Features
User Authentication: Supports user sign-up and login functionalities, including password hashing and JWT-based session management.
Property Listings: Allows authenticated agents to create new property listings, which are stored in a MongoDB database.
Property Saving: Enables users to save properties for later viewing, linking saved properties to user accounts.
Property Retrieval: Provides endpoints to fetch all properties and view individual property details by ID.

# API Endpoints: 
1. POST /auth/register: registers a new user. It performs the following:
-Validates email and password inputs.
-Checks if the user already exists.
-Ensures the password is at least 7 characters long.
-Hashes the password using bcrypt.
-Saves the new user to the database.
-Returns a success message with user details (excluding password).

 2. POST /auth/login: The  API is a user login endpoint that authenticates users. It:
°Verifies the provided email and password.
°Checks if the user exists in the database.
°Compares the input password with the stored hashed password.
°Generates a JWT access token (valid for 7 hours) and a refresh token (valid for 30 days).
°Returns a success message, tokens, and user details (excluding password).
Returns appropriate error messages for invalid credentials or server issues.

 3. POST /properties (agent):  The  API is a property creation endpoint that allows an authenticated user (agent) to add a new property listing. It:
°Extracts required fields: title, price, location, and agent.
°Validates that all fields are provided.
°Associates the property with the logged-in user's ID.
°Saves the property to the database.
°Returns a success message upon successful creation.
Returns a 400 error if required data is missing or an error occurs.

 4. GET /properties: The  API is a get all properties endpoint that retrieves all property listings from the database. It:
°Fetches all entries from the pro collection.
°Returns a success message with the list of properties.
Returns a 500 error if an error occurs during the fetch operation.

 5. GET /properties/:id: The  API is a get property by ID endpoint that retrieves a specific property using its ID. It:
°Extracts the property ID from the request parameters.
°Searches the database for a property with the matching ID.
°Returns the property details and a success message if found.
Returns a 400 error if an error occurs during the search.

 6. -POST /saved: The  API is a save property endpoint that allows a user to save a specific property. It:
°Accepts user and property IDs from the request body.
°Validates that both fields are provided.
°Creates and stores a new saved property entry in the database.
°Returns a success message upon successful saving.
Returns a 400 error if input is missing or an error occurs.

 7. GET /saved: The API is a get saved properties endpoint that retrieves all saved property records from the database. It:
°Fetches all entries from the saveProperty collection.
°Returns a success message along with the list of saved properties.
Returns a 400 error if an error occurs during the fetch operation.

# Middleware
•Authentication 
•validateregister

# Technologies Used
1. Backend: Node.js with Express
2. Database: MongoDB
3. Authentication: JWT and bcrypt for secure user authentication
4. API Design: RESTful API architecture
This project demonstrates foundational backend development skills, including API design, user authentication, and database integration.

# API test documentation:
https://documenter.getpostman.com/view/44250905/2sB2x5Hsu7