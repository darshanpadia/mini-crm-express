# Mini CRM Express API

A simple, modular, and scalable REST API built with Node.js and Express for managing customers using in-memory storage.

### 📦 Features
- RESTful CRUD operations
- In-memory data (no DB)
- Custom validators 
- Modular controllers, services, and middlewares
- Scalable folder structure

### 🚀 Quick Start

```bash
# 1. Clone or Download the Project
git clone https://github.com/your-username/mini-crm-express.git

# 2. Navigate to project root
cd mini-crm-express-main

# 3. Rename environment file
mv .env-example .env     # or rename manually if on Windows

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

```
# Folder Structure
mini-crm-express/
│
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── validators/
│ ├── middlewares/
│ ├── app.js
│ └── server.js
│
├── .env-example → Rename to .env
├── package.json
├── README.md
```

```
## ⚙️ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

> 🔎 Check versions:
bash
node -v
npm -v

```

```
🔗 API Endpoints (Base URL: http://localhost:3000/customers)
Method	Endpoint	Description
GET	/	Fetch all customers
POST	/	Create new customer
PUT	/:id	Update customer by ID
DELETE	/:id	Delete customer by ID

📬 Sample Request (POST)
JSON Payload
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}

Test using Postman:
Set method to POST

URL: http://localhost:3000/customers

header: "Content-Type: application/json"

Body → Raw → JSON

Paste the payload above

Test using cURL
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -d '{"id":"123","name":"John Doe","email":"john@example.com"}'

## Other endpoints
PUT /customers/<id> 
with body:
Payload:
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

GET /customers

DELETE /customers/<id>
```

💬 Environment Configuration
.env file is used for environment-specific configs.
You can add your own or resuse .env-example: (rename it to .env)

PORT=3000
NODE_ENV=development
