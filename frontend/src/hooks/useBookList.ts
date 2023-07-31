// useBookList.ts
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import useResponsiveItemsPerPage from './useResponsiveItemsPerPage';
import { booksListState } from '../state/recoilAtoms';

const useBookList = () => {
  const [books, setBooks] = useRecoilState(booksListState);
  const itemsPerPage = useResponsiveItemsPerPage(); // Use the custom hook for responsive items per page
  const initialPage = 1; // Initial page number

  const fetchBooks = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:4000/books?page=${page}&limit=${itemsPerPage}`);
      const newBooks = response.data;

      // Append the new books to the existing list
      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleScroll = () => {
    // Check if the user is near the bottom of the page
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollY = window.scrollY;
    const distanceToBottom = scrollHeight - (scrollY + clientHeight);

    // Adjust the distance threshold based on your needs (e.g., 300 pixels)
    const threshold = 300;

    if (distanceToBottom < threshold) {
      // Load more books when the user is near the bottom
      fetchBooks(books.length / itemsPerPage + 1);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the hook is called
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [books, itemsPerPage]);

  // Fetch initial books when the hook is called
  useEffect(() => {
    fetchBooks(initialPage);
  }, [itemsPerPage]);

  // No need to return anything here
};

export default useBookList;
