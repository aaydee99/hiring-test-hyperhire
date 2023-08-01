import { Book } from '../entity/book';
class BookService {
  async getAllBooks(itemsPerPage: number, pageNumber: number): Promise<Book[]> {
    const offset = (pageNumber - 1) * itemsPerPage;
    return Book.findAll({ offset, limit: itemsPerPage });
  }

  async createBook(book: Book): Promise<Book> {
    return Book.create(book);
  }

  async updateBook(bookId: string, updatedBook: Book): Promise<Book | null> {
    const existingBook = await Book.findByPk(bookId);
    if (!existingBook) {
      return null;
    }

    await existingBook.update(updatedBook);
    return existingBook;
  }

  async deleteBook(bookId: string): Promise<Book | null> {
    const existingBook = await Book.findByPk(bookId);
    if (!existingBook) {
      return null;
    }

    await existingBook.destroy();
    return existingBook;
  }

  async buyBook(bookId: string, quantity: number): Promise<Book | null> {
    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (book.quantity < quantity) {
      throw new Error('Insufficient quantity available for purchase');
    }

    book.quantity -= quantity;
    await book.save();

    return book;
  }
}

export default BookService;
