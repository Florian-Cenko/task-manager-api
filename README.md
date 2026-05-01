# 🚀 Task Manager API & Web Client

A robust **Full-Stack Task Management Application** featuring a **Spring Boot** RESTful backend and a **React.js** frontend with **Tailwind CSS**. It is designed to manage daily tasks, users, and categories efficiently with real-time data visualization.

---

## ✨ Key Features

### Backend (Spring Boot)
* **User-Task Association:** Strictly linked data per user.
* **Full CRUD Operations:** Comprehensive management of tasks and categories.
* **Advanced Filtering & Pagination:** Server-side support for searching and paginated task retrieval.
* **Smart Statistics:** Custom endpoints to calculate completion percentages and progress per user.
* **DTO Pattern:** Ensures clean, decoupled, and secure JSON data exchange.

### Frontend (React)
* **Modern UI/UX:** Built with **Tailwind CSS** for a fully responsive design.
* **Data Visualization:** Interactive charts (Pie & Bar charts) using **Recharts** to track productivity.
* **Custom Hooks Architecture:** Clean logic separation using custom hooks (`useTasks`, `useCategoryManager`) for state management.
* **Category Management:** Create, filter, and assign tasks to custom categories.
* **Authentication:** Secure session management (via SessionStorage).
* **Interactive Modals:** Dynamic modal-based form handling for better UX.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js
* **Styling:** Tailwind CSS
* **Icons:** React Icons
* **Charts:** Recharts
* **State Management:** React Hooks (useState, useEffect)

### Backend
* **Language:** Java 17+
* **Framework:** Spring Boot 3.x
* **Persistence:** Spring Data JPA (Hibernate)
* **Database:** H2 (In-memory) / MySQL compatible
* **Build Tool:** Maven

---

## 🚦 Getting Started

### Prerequisites
* Java JDK 17+
* Node.js & npm (for the frontend)
* Maven

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/task-manager-api.git](https://github.com/your-username/task-manager-api.git)
     ```
2. ### Backend Setup:
    ```bash
    cd backend
    mvn spring-boot:run
    ```
3. ### Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```



