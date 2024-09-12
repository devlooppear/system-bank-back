# 🏦 System Bank Backend

Este projeto simula um sistema de backend para uma aplicação bancária, com gerenciamento de usuários, processamento de transações e gerenciamento de contas.

## 🚀 Como Começar

Para configurar e executar a aplicação, siga os passos abaixo:

## Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- Banco de dados PostgreSQL

## Instalação

### Clone o repositório:

```bash
git clone <repository-url>
cd system-bank-backend
```

### Instale as dependências:

```bash
npm install
```

### Crie um arquivo .env:

```bash
cp .env.example .env
```

### Inicie a aplicação:

```bash
docker-compose up
```

### Popular o Banco de Dados

```bash
npm run migraate:fresh
```

### Execute a aplicação:

```bash
npm run start:dev
```

A aplicação estará disponível em http://localhost:5533.

## 🔑 Autenticação

Você precisará de um token JWT como um token Bearer para fazer requisições às rotas. Certifique-se de implementar a funcionalidade de login do usuário para obter este token.

## 🛠️ Funcionalidades

- Gerenciamento de Usuários: Criar, atualizar e excluir contas de usuários.
- Gerenciamento de Contas: Os usuários podem ter múltiplas contas (corrente e poupança).
- Processamento de Transações: Suporte a diversos tipos de transações, incluindo TED e PIX.
- Histórico de Transações: Rastrear todas as transações realizadas pelos usuários.

## 📚 Modelos de Dados

### Enums

AccountType:

Representa o tipo de contas. Valores:

- CORRENTE (Conta Corrente)
- POUPANCA (Conta Poupança)

TransactionType:

Representa o tipo de transações. Valores:

- TED (Transferência Eletrônica)
- PIX (Sistema de Pagamento Instantâneo)

Modelos

User

- Campos: id, name, email, password, created_at, updated_at
- Relacionamentos: Possui múltiplas contas e registros de histórico de transações.

Account

- Campos: id, user_id, balance, account_type, created_at, updated_at
- Relacionamentos: Pertence a um usuário e pode ter múltiplas transações.

Transaction

- Campos: id, account_id, transaction_type, amount, transaction_date, cpf_recipient, cnpj_recipient, recipient_name, etc.
- Relacionamentos: Pertence a uma conta e pode ter múltiplas entradas no histórico de transações.

TransactionHistory

- Campos: id, transaction_id, user_id, movement_date, created_at, updated_at
- Relacionamentos: Corresponde a transações específicas realizadas pelos usuários.

PersonalAccessToken

- Campos: id, token, user_id, created_at, expires_at
- Relacionamentos: Pertence a um usuário.

## 🔄 Relacionamentos

Um usuário pode ter várias contas e registros de histórico de transações.
Cada conta pertence a um usuário e pode ter múltiplas transações.
Cada transação pertence a uma conta e pode ter várias entradas no histórico de transações.

## 📦 Dependências

- Prisma: ORM para interagir com o banco de dados PostgreSQL.
- Express: Framework web para construir a API.
- jsonwebtoken: Para gerar e verificar tokens JWT.

## 🔒 Segurança

Certifique-se de implementar medidas de segurança adequadas para senhas de usuários e detalhes sensíveis de transações, incluindo a criptografia de senhas e a proteção de tokens.
