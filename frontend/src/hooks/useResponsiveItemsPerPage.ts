// useResponsiveItemsPerPage.ts
import { useState, useEffect } from 'react';

const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  useEffect(() => {
    const updateItemsPerPage = () => {
      const smallScreenItemsPerPage = 5;
      const mediumScreenItemsPerPage = 10;
      const largeScreenItemsPerPage = 15;

      // Adjust the breakpoints as per your CSS media queries
      if (window.innerWidth <= 767) {
        setItemsPerPage(smallScreenItemsPerPage);
      } else if (window.innerWidth <= 1023) {
        setItemsPerPage(mediumScreenItemsPerPage);
      } else {
        setItemsPerPage(largeScreenItemsPerPage);
      }
    };

    updateItemsPerPage();

    // Attach a resize event listener to update the itemsPerPage when the screen size changes
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      // Remove the event listener when the hook is unmounted
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  return itemsPerPage;
};

export default useResponsiveItemsPerPage;
