import BookModel, { BookDocument } from '../entity/book.model';
import { BookInterface } from '../entity/book';

class BookService {
  async getAllBooks(itemsPerPage: number, pageNumber: number): Promise<BookDocument[]> {
    const skip = (pageNumber - 1) * itemsPerPage;
    return BookModel.find().skip(skip).limit(itemsPerPage).exec();
  }

  async createBook(book: BookInterface): Promise<BookDocument> {
    return BookModel.create(book);
  }

  async updateBook(bookId: string, book: BookInterface): Promise<BookDocument | null> {
    return BookModel.findByIdAndUpdate(bookId, book, { new: true }).exec();
  }

  async deleteBook(bookId: string): Promise<BookDocument | null> {
    return BookModel.findByIdAndDelete(bookId).exec();
  }
  async buyBook(bookId: string, quantity: number): Promise<BookDocument | null> {
    const book = await BookModel.findById(bookId).exec();
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
