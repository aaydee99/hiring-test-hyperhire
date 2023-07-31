import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db';
import { getAllBooks, createBook, updateBook, deleteBook } from './controller/book.controller';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/books', getAllBooks);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

// Connect to MongoDB
connectDB();

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
