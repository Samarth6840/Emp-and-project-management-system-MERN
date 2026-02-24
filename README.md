⸻

Employee and Project Management System (EPMS)

A web-based Employee and Project Management System designed to streamline employee administration and project tracking within an organization or academic environment. The system supports role-based access control, enabling Admins to manage employees and projects, while Employees can track and update their assigned work.

⸻

📌 Features

👤 Admin Features
	•	Secure login & logout (session-based authentication)
	•	Dashboard with system overview
	•	Employee management (Add, Edit, Delete)
	•	Project creation and assignment
	•	Role assignment (Admin / User)
	•	Monitor project and module status
	•	Protected admin-only routes

👨‍💼 Employee (User) Features
	•	Secure login & logout
	•	View assigned projects and modules
	•	Update project/module status
	•	Track progress (Pending → In Progress → Completed)
	•	Profile management
	•	Restricted access from admin routes

⸻

🧱 System Modules
	•	Employee Management
	•	Project Management
	•	Module Management
	•	Authentication & Authorization
	•	Session Management
	•	Role-Based Access Control

⸻

🛠️ Technology Stack

Layer	Technology
Frontend	HTML5, CSS3, Bootstrap, EJS
Backend	Node.js, Express.js
Database	MongoDB
Sessions	express-session
Auth	Custom middleware (role-based)


⸻

🗂️ Database Structure (MongoDB)

Users Collection (users)

{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "admin | user",
  "designation": "Software Engineer",
  "department": "IT",
  "contact": "9876543210",
  "status": "active | inactive",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

Projects Collection (projects)

{
  "_id": "ObjectId",
  "title": "Inventory Management System",
  "description": "A web app for inventory tracking",
  "startDate": "ISODate",
  "endDate": "ISODate",
  "status": "Not Started | In Progress | Completed",
  "createdBy": "ObjectId",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

Modules Collection (modules)

{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "title": "Authentication Module",
  "description": "Handles login/logout and session security",
  "assignedTo": "ObjectId",
  "status": "Pending | In Progress | Completed",
  "progressNotes": "JWT implemented",
  "startDate": "ISODate",
  "endDate": "ISODate",
  "updatedAt": "ISODate"
}


⸻

🚀 Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/epms.git
cd epms

2️⃣ Install dependencies

npm install

3️⃣ Configure environment variables

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

4️⃣ Run the application

npm start

Open in browser:

http://localhost:5000


⸻

🔐 Security Highlights
	•	Role-based middleware protection
	•	Session-based authentication
	•	Admin/User route segregation
	•	Unauthorized access redirection

⸻

📚 Use Cases
	•	Educational institutes
	•	Training centers
	•	Small organizations
	•	Project-based teams

⸻

📈 Future Enhancements
	•	JWT authentication
	•	Email notifications
	•	File uploads for modules
	•	Activity logs
	•	REST API version
	•	Frontend framework integration

⸻

🤝 Contributing

Contributions are welcome!
Fork the repository, create a feature branch, and submit a pull request.

⸻

📄 License

This project is for educational and academic purposes.
____
