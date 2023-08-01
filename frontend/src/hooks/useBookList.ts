// useBookList.ts
import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { booksListState } from '../state/recoilAtoms';
import axios from 'axios';
import useResponsiveItemsPerPage from './useResponsiveItemsPerPage';

const useBookList = () => {
  const [books, setBooks] = useRecoilState(booksListState);
  const itemsPerPage = useResponsiveItemsPerPage(); // Use the custom hook for responsive items per page
  
  const fetchBooks = useCallback(
    async () => {
      try {
        const response = await axios.get(`http://localhost:4000/books?page=1&limit=100`);
        const newBooks = response.data;

        // Append the new books to the existing list
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    [itemsPerPage, setBooks]
  );

  const handleScroll = useCallback(() => {
    // Check if the user is near the bottom of the page
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollY = window.scrollY;
    const distanceToBottom = scrollHeight - (scrollY + clientHeight);

    // Adjust the distance threshold based on your needs (e.g., 300 pixels)
    const threshold = 300;

    if (distanceToBottom < threshold) {
      // Load more books when the user is near the bottom
      fetchBooks();
    }
  }, [fetchBooks]);

  useEffect(() => {
    // Attach the scroll event listener when the hook is called
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Fetch initial books when the hook is called
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // No need to return anything here
};

export default useBookList;
