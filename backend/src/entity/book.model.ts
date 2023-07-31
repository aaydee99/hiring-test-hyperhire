import mongoose, { Schema, Document } from 'mongoose';
import { BookInterface } from './book';

export interface BookDocument extends BookInterface, Document {}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true }, // New property for book quantity
});

const BookModel = mongoose.model<BookDocument>('Book', BookSchema);

export default BookModel;
