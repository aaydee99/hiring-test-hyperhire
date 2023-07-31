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
}

export default BookService;
