
# **Finance Tracker**  

Finance Tracker is a simple expense management app built with React and Vite. This project was created to get familiarized with React and will be expanded with additional features over time.  

## 🚀 Live Demo

The application is deployed on **Vercel** (frontend) and **Render** (backend). [Live Demo](https://finance-tracker-two-flax.vercel.app/)

## **Features**  

- **Login:** Authenticates users and returns a JWT token.
- **User Registration:** Allows new users to register with an email and password.
- **Protected Routes:** Secures endpoints so that only authenticated users can access them.
- **Password Hashing:** Uses bcrypt to securely hash and store user passwords.
- **JWT-Based Authentication**
- **Dashboard:**  
  - Displays a pie chart for expense distribution.  
  - Shows expense data in a table format.  
  - Data can be added or deleted from the table.  
  - Data is synchronized between the pie chart and table using Redux.
  - Data stored in state, not persisted via API

## **Tech Stack**  

- **Frontend:** React, Vite
- **State Management:** Redux
- **Backend:** Node js, Express
- **Database:** MongoDB Atlas
- **Styles:** Material UI

## **Planned Features**  

- Add a monthly expense tracker.
- Explore spending trends and charts.
- Send reminders  
