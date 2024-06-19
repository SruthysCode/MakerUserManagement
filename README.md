User Management 

This application provides endpoints for user registration and fetching user details. 
It consists of a backend built with Node.js and Express, and a frontend built with Angular.

Prerequisites:
1. Node.js and npm
2. Angular CLI
3. MongoDB

Setup

Clone the repository:
git clone <repository-url>
cd Maker

Backend

1.  Navigate to the backend directory:
cd server


2. Install dependencies:
npm install

3. Run the backend server:
node index.js


Frontend

1. Navigate to the frontend directory:
cd client\user

2.Install dependencies:
npm install

3. Run the Angular application:
ng serve

4. Open your browser and navigate to http://localhost:4200.


API Endpoints

1.Register User

URL: /api/user/register
Method: POST
Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

2.Fetch Users

URL: /api/user/fetch
Method: GET
Body:
{
  "name": "string"
}

CURL Commands

1. Register User  	

curl -X POST http://localhost:3000/api/user/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John",
  "email": "john@example.com",
  "password": "Aa@12345"
}'

2. Fetch Users

curl http://localhost:3000/api/user/fetch


Running the Application

1. Ensure the MongoDB server is running.
2. Start the backend server.
3. Start the Angular application.
4. Open your browser and navigate to http://localhost:4200 to use the application.
