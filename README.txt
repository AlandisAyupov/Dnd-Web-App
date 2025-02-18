# DnD Web App

## Project Writeup

This is a full-stack CRUD web application where you can create a user and associated characters for that user.

## Tech Stack

- MongoDB
- Node.js
- Express.js
- React

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en)

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the frontend server:
    ```sh
    npm start
    ```

### Backend

To run the backend without errors, you need to replace the environment variables `process.env.DB` and `process.env.PORT`.

- Follow this [tutorial](https://www.youtube.com/watch?v=084rmLU1UgA&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&index=25) to get a URI to replace `process.env.DB`.
- Set `process.env.PORT` to any port number (e.g., 4000).

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Set up the environment variables by copying the `example.env` template to a new `.env` file:
    ```sh
    cp example.env .env
    ```
    Set the port to whatever number you like, e.g: 4000, and have the DB set to a MongoDB connection URL. 
    Check MongoDB documentation here for help: https://www.mongodb.com/docs/atlas/getting-started/
4. Start the backend server:
    ```sh
    npm start
    ```

