import { Request, Response } from 'express';
import BookService from '../service/book.service';
import { Book } from '../entity/book';

const bookService = new BookService();

export async function getAllBooks(req: Request, res: Response): Promise<void> {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;

    const books = await bookService.getAllBooks(itemsPerPage, pageNumber);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
}

export async function createBook(req: Request, res: Response): Promise<void> {
  try {
    const book = req.body as Book;
    const createdBook = await bookService.createBook(book);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book' });
  }
}

export async function updateBook(req: Request, res: Response): Promise<void> {
  try {
    const bookId = req.params.id;
    const book = req.body as Book;
    const updatedBook = await bookService.updateBook(bookId, book);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book' });
  }
}

export async function deleteBook(req: Request, res: Response): Promise<void> {
  try {
    const bookId = req.params.id;
    const deletedBook = await bookService.deleteBook(bookId);
    if (deletedBook) {
      res.json(deletedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
}

export async function buyBook(req: Request, res: Response): Promise<void> {
  try {
    const bookId = req.params.id;
    const quantity = parseInt(req.body.quantity as string);
    if (isNaN(quantity) || quantity <= 0) {
      res.status(400).json({ message: 'Invalid quantity provided' });
      return;
    }

    const purchasedBook = await bookService.buyBook(bookId, quantity);
    res.json(purchasedBook);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to buy book' });
  }
}
