# 🚀 Task Manager API

A robust RESTful backend application built with **Spring Boot**, designed to manage daily tasks, users, and categories efficiently. This API features advanced progress tracking, priority filtering, and automated statistics.

---

## ✨ Key Features

* **User-Task Association:** Tasks are strictly linked to specific users.
* **Full CRUD Operations:** Create, Read, Update, and Delete tasks with ease.
* **Smart Statistics:** Custom endpoints to calculate completion percentages and pending tasks per user.
* **Categorization:** Organize tasks into custom categories (e.g., Work, Personal, Urgent).
* **Priority Management:** Search and filter tasks based on Priority levels (High, Medium, Low).
* **DTO Pattern Implementation:** Uses Data Transfer Objects (DTOs) to ensure clean, decoupled, and secure JSON responses.
* **Swagger/OpenAPI Documentation:** Interactive API playground for easy testing and integration.

---

## 🛠️ Tech Stack

* **Language:** Java 17+
* **Framework:** Spring Boot 3.x
* **Persistence:** Spring Data JPA (Hibernate)
* **Database:** H2 (In-memory for development)
* **Build Tool:** Maven
* **API Specs:** OpenAPI / Swagger UI

---

## 🚦 Getting Started

### Prerequisites
* Java JDK 17 or higher
* Maven installed

### Installation & Run
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/task-manager-api.git](https://github.com/your-username/task-manager-api.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd task-manager-api
    ```
3.  **Build and Run:**
    ```bash
    mvn spring-boot:run
    ```

---

## 📖 API Documentation

Once the application is running, you can access the interactive Swagger UI to test all endpoints at:
👉 `http://localhost:8080/swagger-ui/index.html`

### Primary Endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/tasks/add` | Create a new task for a user and category |
| `GET` | `/api/tasks/{userId}/stats` | Get real-time progress & completion stats |
| `PATCH` | `/api/tasks/{id}/complete` | Mark a specific task as completed |
| `GET` | `/api/tasks/category/{id}` | Retrieve all tasks within a specific category |
| `GET` | `/api/tasks` | Get all tasks (returns TaskResponseDTO) |

---

## 🏗️ Architecture

The project follows a clean **Layered Architecture**:
* **Controller Layer:** Handles HTTP requests and routing.
* **Service Layer:** Contains business logic, mapping, and statistical calculations.
* **Repository Layer:** Manages database communication via Spring Data JPA.
* **DTO Layer:** Decouples the internal database schema from the public API response for better security and performance.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
