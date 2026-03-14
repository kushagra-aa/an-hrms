# HRMS Lite

A lightweight Human Resource Management System for managing employee records and tracking daily attendance.

## Project Overview

This project is a lightweight Human Resource Management System (HRMS) designed to streamline basic administrative tasks. It allow an admin to:

- Manage employee records
- Track daily attendance

The project demonstrates core software engineering principles, including:

- Frontend development with modern frameworks
- Backend API design and implementation
- Database persistence and modeling
- Robust validation and error handling
- Deployment readiness for production environments

## Live Deployment

Frontend: [An HRMS Netlify](https://an-hrms-k.netlify.app/)

Backend API: [An HRMS Render](https://an-hrms.onrender.com)

Repository: [An HRMS GitHub](https://github.com/kushagra-aa/an-hrms)

## Tech Stack

### Frontend

- Angular 21
- TailwindCSS
- ZardUI Components (Custom reusable UI library)

### Backend

- NestJS
- Prisma ORM

### Database

- PostgreSQL (Managed via Supabase)

### Deployment

- Frontend: Netlify
- Backend: Railway

## Features

### Employee Management

- **Add Employee**: Register new members with detailed information.
- **View Employee List**: Access the complete organization directory.
- **Delete Employee**: Remove records from the system as needed.

### Attendance Management

- **Mark Attendance**: Record daily attendance status (Present/Absent).
- **View Attendance History**: Track historical records for specific employees.

### UI Features

- **Loading States**: Visual indicators during data fetch and submission.
- **Empty States**: Clear messaging when no records are found.
- **Error States**: User-friendly error notifications and recovery options.
- **Reusable Components**: Modular architecture using shared UI elements.

## API Endpoints

### Employees

- `POST /employees`: Create a new employee record.
- `GET /employees`: Retrieve a list of all active employees.
- `DELETE /employees/:id`: Permanently remove an employee by their unique ID.

### Attendance

- `POST /attendance`: Log an attendance record for an employee on a specific date.
- `GET /attendance/:employeeId`: Retrieve the full attendance history for a specific employee.

## Database Design

The system uses a relational PostgreSQL database with the following tables:

- `employees`: Stores core personnel data.
- `attendance`: Stores daily attendance logs with a relationship to employees.

Naming Conventions:

- The database schema utilizes `snake_case` naming for tables and columns.
- The application code uses `camelCase` naming conventions.
- Prisma ORM handles the mapping between the two layers via `@map` annotations.

## Running the Project Locally

### Prerequisites

- Node.js (v18 or higher)
- pnpm or npm

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kushagra-aa/an-hrms.git
   cd an-hrms
   ```

2. **Install Dependencies**

   ```bash
   # Install API dependencies
   cd api
   pnpm install

   # Install Web dependencies
   cd ../web
   pnpm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `api` directory based on the provided template.

   ```bash
   cd api
   cp .env.example .env
   ```

   Edit the `.env` file with your database connection string and other configurations.

4. **Run Backend Server (NestJS)**

   ```bash
   cd api
   pnpm start:dev
   ```

5. **Run Frontend Server (Angular)**
   ```bash
   cd web
   pnpm start
   ```

The backend requires a valid PostgreSQL connection string (e.g., from Supabase) to run.

## Environment Variables

The backend requires the following environment variables:

| Variable       | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string for Prisma                             |
| `PORT`         | Optional: Port for the backend server (default: 3000)               |
| `CORS_ORIGINS` | Optional: Allowed origins for CORS (default: http://localhost:4200) |

Place these variables in a `.env` file within the `api/` directory. You can use the provided `api/.env.example` as a template.

## Assumptions and Limitations

- **Authentication**: The system is designed for internal use and currently assumes a single admin user without a login system.
- **HR Scope**: The system focuses exclusively on core record-keeping and attendance; it does not include payroll or leave management.
- **UI Complexity**: The interface is designed for efficiency and simplicity, adhering to the project's lightweight assignment scope.

## AI Assistance Disclosure

AI tools were utilized during the development process to assist with:

- Generating initial project boilerplate and structure
- Accelerating the implementation of repetitive code patterns
- Assisting with debugging and performance testing
- Generating base designs for shared UI components

All architectural decisions, final code reviews, and project structural refinements were manually controlled and verified by the developer. AI was used as a development accelerator, similar to documentation search or automated code generators.

## Future Improvements

- **Authentication and Role Management**: Implementing secure login and permission levels.
- **Advanced Analytics**: Adding reports for attendance trends and workforce metrics.
- **Pagination and Filtering**: Implementing server-side search and pagination for large datasets.
- **Improved Dashboard Insights**: Expanding the dashboard with more comprehensive workforce overviews.
