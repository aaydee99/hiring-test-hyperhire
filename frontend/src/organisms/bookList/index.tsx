// BookList.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import useBookList from '../../hooks/useBookList';
import { booksListState } from '../../state/recoilAtoms';
import BookCard from '../../molecules/bookCard';

const BookList: React.FC = () => {
  // Use the custom hook to fetch books and update the Recoil state
  useBookList();

  // Get the books data from the Recoil atom
  const books = useRecoilValue(booksListState);

  return (
    <div>
      <h1>Book List</h1>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}>
        {/* Render BookCard components */}
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}

        {/* Add a hidden element as the trigger for infinite scrolling */}
        <div id="infinite-scroll-trigger" className="hidden"></div>
      </div>
    </div>
  );
};

export default BookList;
