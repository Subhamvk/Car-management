
# 🚗 Car Management System

A full-stack application for managing cars, allowing users to add, update, delete, and search for cars. This project consists of a **React-based frontend** and a **Node.js/Express-based backend**, with Swagger documentation for the API.

---

Deployment
Frontend
The frontend is deployed on Vercel and can be accessed at:
car-management-dinxk0gaq-subhamvks-projects.vercel.app

Alternate URL:
car-management-puce.vercel.app

Backend
The backend is deployed on Render and can be accessed at:
[Car Management Backend](https://car-management-108y.onrender.com)

## 🖥️ **Frontend**

### **Tech Stack**
- React
- React Router
- Axios

### **Features**
- List all cars in a grid view.
- Search cars by title, description, or tags.
- Add new cars with images.
- Edit car details.
- View car details on a separate page.

### **Setup Instructions**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the frontend at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ **Backend**

### **Tech Stack**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Swagger (for API documentation)

### **Features**
- User authentication (login and signup).
- CRUD operations for cars:
  - Create a new car entry with images.
  - Retrieve car listings.
  - Update car details.
  - Delete car entries.
- Search cars by keywords (title, description, or tags).
- File upload for car images.

### **Setup Instructions**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the backend at [https://car-management-108y.onrender.com](https://car-management-108y.onrender.com).

---

## 📜 **API Documentation**

### **Swagger UI**
This project uses **Swagger** for API documentation. The API documentation is served at:
[https://car-management-108y.onrender.com/api/docs](https://car-management-108y.onrender.com/api/docs)

### **How to Use the Documentation**
1. Open the `/api/docs` endpoint in your browser.
2. View detailed API specifications, including available endpoints, request parameters, and response formats.
3. Use the "Try it out" feature to test API endpoints directly from the documentation.

---



## 🚀 **How to Run the Project**

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
3. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🧩 **Directory Structure**

### **Frontend**
```
/frontend
  ├── /src
  │   ├── /components   # React components
  │   ├── /pages        # Page components
  │   ├── App.js        # Main application file
  │   ├── index.js      # Entry point
  │   └── styles.css    # Global styles
  ├── package.json
  └── public
```

### **Backend**
```
/backend
  ├── /config           # Configuration files (e.g., DB connection)
  ├── /controllers      # Route controllers
  ├── /middleware       # Middleware (e.g., authentication)
  ├── /models           # Mongoose schemas
  ├── /routes           # Express routes
  ├── /uploads          # Uploaded car images
  ├── swagger.yaml      # API documentation (Swagger)
  ├── app.js            # Entry point
  ├── package.json
  └── .env              # Environment variables
```

---

## 🛡️ **Authentication**
- Users must log in to manage car data.
- JWT-based authentication is implemented for secured API access.

---

## 🛠️ **Features to Extend**
- Add pagination for car listings.
- Implement advanced filters (e.g., by price, model year).
- Enable multi-user roles (e.g., admin vs. regular users).
- Add deployment configurations for production (e.g., Docker).

---

## 📖 **License**
This project is licensed under the MIT License.

---

## ✨ **Contributors**
- **[Your Name]** - Full-Stack Developer
