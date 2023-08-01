import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './entity/book';
import dotenv from 'dotenv';

const app = express();
dotenv.config(); // Load environment variables from .env file

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
import { getAllBooks, createBook, updateBook, deleteBook, buyBook } from './controller/book.controller';

app.get('/books', getAllBooks);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.post('/books/:id/buy', buyBook);

// Connect to MySQL database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Book],
});

// Sync the models with the database (create tables if they don't exist)
sequelize.sync().then(() => {
  console.log('Connected to MySQL database');
}).catch((err) => {
  console.error('Failed to connect to MySQL database:', err);
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
