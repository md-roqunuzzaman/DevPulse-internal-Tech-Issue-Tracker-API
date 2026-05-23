

#  DevPulse – Internal Tech Issue Tracker API

DevPulse is a backend system for managing software issues (bugs & feature requests). It allows teams to report issues, manage workflows, and track progress with role-based access control.

#  Live URL :  

#  Tech Stack

Node.js
 Express.js (Modular architecture)
 TypeScript
PostgreSQL (NeonDB)
 Raw SQL (`pg` driver only)
 bcrypt (password hashing)
 jsonwebtoken (JWT authentication)
 dotenv (environment config)


#  Features

##  Authentication

 User signup with role (contributor / maintainer)
 Secure login with JWT
 Password hashing using bcrypt

##  Issues Management

 Create bug / feature request
 View all issues with filtering & sorting
 View single issue details
 Update issue (role-based access control)
 Delete issue (maintainer only)

##  Role System

 Contributor: create & update own open issues
 Maintainer: full control (update/delete any issue)



#  Installation & Setup

## 1. Clone repository

```bash
git clone https://github.com/md-roqunuzzaman/DevPulse-internal-Tech-Issue-Tracker-API.git
cd devpulse
```

## 2. Install dependencies

```bash
npm install
```

## 3. Setup environment variables

Create `.env` file:

```env
PORT=3000
connectionStr=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

## 4. Run database

Tables will auto-create on server start:

* users
* issues

---

## 5. Start server

```bash
npm run dev
```

---

#  API Endpoints

##  Auth

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/login
```

---

##  Issues

### Create Issue

```
POST /api/issues
Authorization: <JWT>
```

### Get All Issues

```
GET /api/issues?sort=newest&type=bug&status=open
```

### Get Issue by ID

```
GET /api/issues/:id
```

### Update Issue

```
PATCH /api/issues/:id
Authorization: <JWT>
```

### Delete Issue

```
DELETE /api/issues/:id
Authorization: <JWT>
```

---

#  Database Schema

## Users Table

* id (SERIAL PRIMARY KEY)
* name (VARCHAR 100)
* email (UNIQUE)
* password (TEXT)
* role (contributor | maintainer)
* created_at (TIMESTAMP)
* updated_at (TIMESTAMP)

---

## Issues Table

* id (SERIAL PRIMARY KEY)
* title (VARCHAR 150)
* description (TEXT)
* type (bug | feature_request)
* status (open | in_progress | resolved)
* reporter_id (INTEGER)
* created_at (TIMESTAMP)
* updated_at (TIMESTAMP)

---

# Authentication Flow

1. User logs in
2. Server validates credentials
3. JWT token generated
4. Client sends token in headers:

```
Authorization: Bearer <token>
```

5. Middleware verifies token & role

---

#  Deployment

* Backend: Vercel
* Database: NeonDB 
* Ensure:

  * CORS enabled
  * Environment variables set properly

---

# Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

---

#  Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

#  Author
Built as part of DevPulse Assignment Project
---
# End

This project demonstrates backend architecture, authentication, and PostgreSQL CRUD operations using TypeScript and Express.
:::
