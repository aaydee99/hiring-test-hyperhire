// state.ts
import { atom } from 'recoil';
import { BookInterface as Book } from '../interfaces';

export const booksListState = atom<Book[]>({
  key: 'booksListState',
  default: [],
});
