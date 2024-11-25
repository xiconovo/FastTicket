# FastTicket Application

## Project Overview
FastTicket is a ticket management system that allows users to create, view, update, and manage tickets. The application consists of two parts:

1. **Backend**: Developed using Node.js, Express, and Sequelize (with MySQL database).
2. **Frontend**: Built using React with React Router, React Query, and Styled Components.

## Prerequisites
Before setting up the project, ensure you have the following installed on your system:
- Node.js (version 16 or higher)
- npm (Node Package Manager)
- MySQL database

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone git@github.com:xiconovo/FastTicket.git
```

### 2. Backend Setup
Navigate to the backend directory and follow these steps:
```bash
cd backend
```

#### a. Install Dependencies
Install all required npm packages:
```bash
npm install
```

#### b. Configure Environment Variables
Create a `.env` file in the `backend` directory (or modify the existing one). Set the following variables:
```
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=fastticket
JWT_SECRET=your-jwt-secret
```
Replace the placeholders (`your-database-host`, etc.) with your MySQL database credentials and a secure JWT secret.

#### c. Run the Backend Server
Start the backend server:
```bash
node server.js
```
By default, the server will run on `http://localhost:3010`.

### 3. Frontend Setup
Navigate to the frontend directory and follow these steps:
```bash
cd frontend
```

#### a. Install Dependencies
Install all required npm packages:
```bash
npm install
```

#### b. Configure Environment Variables
Create a `.env` file in the `frontend` directory (or modify the existing one). Set the following variable:
```
VITE_API_URL=http://localhost:3010
```
Replace `http://localhost:3010` with your backend's base URL if it's different.

#### c. Run the Frontend Development Server
Start the frontend development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173` by default. If you change this, you need to change the URL on server because of the CORS policy.

### 4. Database Initialization
Ensure your MySQL database is running and properly configured. The backend will sync the database schema on startup. If you encounter any issues, check your database connection settings in the `.env` file.

### 5. Running the Application
- Access the frontend at: `http://localhost:5173`
- The backend API is available at: `http://localhost:3010`



