import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
// import { BookInterface as Book } from '../interfaces';
import { booksListState } from '../state/recoilAtoms';
import axios from 'axios';

const useBookList = () => {
  const [books, setBooks] = useRecoilState(booksListState);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/books?page=2&limit=2`);
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
      fetchBooks();
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the hook is called
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [books]);

  
  useEffect(() => {
    fetchBooks();
  }, []);

  
};

export default useBookList;
