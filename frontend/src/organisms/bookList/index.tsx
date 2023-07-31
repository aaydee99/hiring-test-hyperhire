// BookList.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import useBookList from '../../hooks/useBookList';
import { booksListState } from '../../state/recoilAtoms';
import BookCard from '../../molecules/bookCard';
import { BookInterface } from '../../interfaces';

const BookList: React.FC = () => {
  // Use the custom hook to fetch books and update the Recoil state
  useBookList();

  // Get the books data from the Recoil atom
  const books = useRecoilValue(booksListState);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {/* Render BookCard components */}
        {books.map((book: BookInterface) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
