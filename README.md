# Sistema de Agendamento de Pessoas

Aplicação web para cadastrar, editar, visualizar e excluir agendamentos. Desenvolvida com **React** no frontend e **NestJS** no backend, com persistência em **PostgreSQL**.

---

## Requisitos

| Ferramenta | Versão recomendada | Observação |
|---|---|---|
| **Git** | qualquer versão recente | Para clonar o repositório |
| **Node.js** | 20+ | Necessário para frontend e backend |
| **npm** | 9+ | Incluso com Node.js |
| **Docker** | versão recente | Necessário para o banco de dados |
| **Docker Compose** | v2+ | Usado para subir o PostgreSQL |

> **Portas utilizadas:** 5432 (PostgreSQL), 3000 (backend), 5173 (frontend)

---

## Como instalar e executar

### 1. Clonar o repositório

```bash
git clone <https://github.com/giihsatiko/appointments.git>
cd appointment-app
```

---

### 2. Subir o banco de dados

```bash
cd backend
docker compose up -d
```

---

### 3. Backend

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```

A API ficará disponível em:
http://localhost:3000

---

### 4. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em:
http://localhost:5173

---

## Ordem de execução (resumo)

1. docker compose up -d (backend)
2. npm install (backend)
3. prisma migrate deploy
4. npm run start:dev (backend)
5. npm install (frontend)
6. npm run dev (frontend)

---

## Tecnologias utilizadas

### Frontend
- React 19
- Vite
- TypeScript
- React Router DOM
- TanStack Query
- React Hook Form + Zod
- Axios
- TailwindCSS
- Socket.io Client
- Vitest

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.io
- class-validator
- Jest
- Docker Compose
