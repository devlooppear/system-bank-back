🏦 System Bank Backend
This project simulates a backend system for a banking application, featuring user management, transaction processing, and account handling.

🚀 Get Started
To set up and run the application, follow these steps:

Prerequisites
Node.js (v14 or higher)
Docker and Docker Compose
PostgreSQL database

## Installation

### Clone the repository:

```bash
git clone <repository-url>
cd system-bank-backend
```

### Install dependencies:

```bash
npm install
```

### Set up the database:

Create a .env file:

```bash
cp .env.example .env
```

### Start the application:

```bash
docker-compose up
```

### Run the App:

```bash
npm run start:dev
```

The application will be available at http://localhost:5533.

### 🔑 Authentication

You will need a JWT token as a Bearer token to make requests to the routes. Ensure to implement user login functionality to obtain this token.

### 🛠️ Features

- User Management: Create, update, and delete user accounts.
- Account Management: Users can have multiple accounts (checking and savings).
- Transaction Processing: Support for various transaction types, including TED and PIX.
- Transaction History: Track all transactions made by users.

### 📚 Data Models

#### Enums

### AccountType:

Represents the type of accounts.
Values:

- CORRENTE (Checking Account)
- POUPANCA (Savings Account)

### TransactionType:

Represents the type of transactions.
Values:
- TED (Electronic Transfer)
- PIX (Instant Payment System)

## Models

### User

- Fields: id, name, email, password, created_at, updated_at
- Relationships: Has multiple accounts and transaction history records.

### Account

- Fields: id, user_id, balance, account_type, created_at, updated_at
- Relationships: Belongs to one user and has multiple transactions.

### Transaction

- Fields: id, account_id, transaction_type, amount, transaction_date, cpf_recipient, cnpj_recipient, recipient_name, etc.
- Relationships: Belongs to one account and can have multiple transaction history entries.

### TransactionHistory

- Fields: id, transaction_id, user_id, movement_date, created_at, updated_at
- Relationships: Corresponds to specific transactions made by users.

### PersonalAccessToken

- Fields: id, token, user_id, created_at, expires_at
- Relationships: Belongs to one user.

## 🔄 Relationships

One user can have multiple accounts and transaction history records.
Each account belongs to one user and can have multiple transactions.
Each transaction belongs to one account and can have multiple entries in transaction history.

## 📦 Dependencies

- Prisma: ORM for interacting with the PostgreSQL database.
- Express: Web framework for building the API.
- jsonwebtoken: For generating and verifying JWT tokens.

## 🔒 Security

Ensure to implement proper security measures for user passwords and sensitive transaction details, including hashing passwords and securing tokens.
