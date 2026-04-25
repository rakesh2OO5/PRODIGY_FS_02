# Employee Management System

Full-stack Employee Management System built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, JWT authentication, and bcrypt password hashing.

## Features

- Admin login with JWT-based authentication
- Protected dashboard routes
- Employee create, read, update, and delete operations
- Backend and frontend validation
- Search and pagination for employees
- Responsive Tailwind UI with sidebar layout
- Environment-based configuration
- Default admin seeding

## Default Admin

- Email: `admin@test.com`
- Password: `admin123`

## Project Structure

```text
client/
server/
```

## Run Locally

### 1. Configure environment variables

Create `.env` files from the examples:

For `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
JWT_SECRET=change_this_to_a_long_secure_secret
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123
```

For `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Start the apps

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

### 4. Open the application

Visit `http://localhost:5173`

## API Endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/employees`
- `GET /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
