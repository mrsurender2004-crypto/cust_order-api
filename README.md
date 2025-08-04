# cust_order-api
Here’s a complete and professional `README.md` for your **CustOrders API** project built using **Node.js and SQL Server**. You can copy this directly into your GitHub repo:

---

````markdown
# 📦 CustOrders REST API

A Node.js RESTful API that connects to a SQL Server database (`CustOrders`) to provide customer information and basic order statistics.

---

## 🔧 Technologies Used

- **Node.js + Express** – for building RESTful services
- **SQL Server** – for storing customer and order data
- **mssql** – Node.js driver to connect to SQL Server
- **CORS** – for cross-origin requests (frontend integration)

---

## 📚 Database Structure

### Database: `CustOrders`

#### Table: `users`
| Column   | Type     | Description             |
|----------|----------|-------------------------|
| id       | INT      | Primary Key             |
| name     | VARCHAR  | Customer name           |
| email    | VARCHAR  | Customer email          |
| ...      | ...      | Any additional columns  |

#### Table: `orders`
| Column   | Type     | Description             |
|----------|----------|-------------------------|
| id       | INT      | Primary Key             |
| user_id  | INT      | Foreign key to `users`  |
| product  | VARCHAR  | Ordered product         |
| date     | DATE     | Order date              |
| ...      | ...      | Additional fields       |

> ✅ Foreign Key Constraint:
```sql
ALTER TABLE orders
ADD CONSTRAINT fk_order FOREIGN KEY (user_id) REFERENCES users(id);
````

---

🚀 API Endpoints

🔹 Get All Customers

```
GET /api/customers
```

Response: Array of all users.

---

🔹 Get Customer by ID with Order Count

```
GET /api/customers/:id
```

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "order_count": 5
}
```

Errors:

* `400 Bad Request` – if ID is not a number
* `404 Not Found` – if customer doesn't exist
* `500 Internal Server Error` – on DB errors

---

⚙️ Setup Instructions

1. Clone the repository


git clone https://github.com/your-username/custorders-api.git
cd custorders-api


2. Install dependencies


npm install


3. Configure SQL Server

Update `db.js` with your SQL Server credentials:

js
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  port: 1433,
  database: 'CustOrders',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};


4. Run the server


node app.js


Server runs on:


http://localhost:3000


🧪 Testing the API

Use any of the following tools:

* Postman
* curl
* Browser (GET only)

**Example:**

```bash
curl http://localhost:3000/api/customers
curl http://localhost:3000/api/customers/1
```

---

## 🌐 CORS Enabled

This API supports cross-origin requests, so you can easily connect it to a frontend app built with React, Angular, etc.

---

## 📂 Project Structure

```
custorders-api/
├── app.js               # Main Express server
├── db.js                # SQL Server DB connection
├── routes/
│   └── customers.js     # Customer API routes
├── package.json
└── README.md


