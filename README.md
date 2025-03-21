## Getting Started

### Using Docker

1. Clone the repository:
```bash
git clone https://github.com/MoeeinAali-Teachings/Prisma-Postgresql.git
cd prisma-postgresql
```

2. Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/department_db"
PORT="3000"
```

3. Start the application using Docker Compose:
```bash
sudo docker-compose up --build -d
```

The API will be available at `http://localhost:3000`

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your database connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/department_db"
PORT="3000"
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

## Development

To make changes to the database schema:

1. Modify the schema in `prisma/schema.prisma`
2. Generate a new migration:
```bash
npx prisma migrate dev --name <migration-name>
```