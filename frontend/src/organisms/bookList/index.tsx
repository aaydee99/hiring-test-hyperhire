// BookList.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { booksListState } from '../../state/recoilAtoms';
import useBookList from '../../hooks/useBookList';
import BookCard from '../../molecules/bookCard';
const BookList: React.FC = () => {
  // Use the custom hook to fetch books and update the Recoil state
  useBookList();

  // Get the books data from the Recoil atom
  const books = useRecoilValue(booksListState);

  // Adjust the number of items per page based on screen size using Tailwind CSS classes
  const itemsPerPage = window.innerWidth <= 767 ? 5 : window.innerWidth <= 1023 ? 10 : 15;

  return (
    <div>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}>
        {/* Render BookCard components */}
        {books.slice(0, itemsPerPage).map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
