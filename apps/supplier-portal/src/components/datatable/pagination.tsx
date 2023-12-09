import { Box, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

export type paginationProps = {
  pageChangeHandler: (index: number) => void;
  totalPages: number;
  totalRows?: number;
  currentPageNo: number;
  pageSize: number;
};

const Pagination = ({
  pageChangeHandler,
  pageSize,
  totalPages,
  currentPageNo,
}: paginationProps) => {
  const noOfPages = totalPages;
  const pagesArr = [...new Array(noOfPages)];
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const onPageSelect = (pageNo: number) => {
    if (pageNo < totalPages && pageNo >= 0) {
      pageChangeHandler(pageNo);
      setCurrentPage(pageNo);
    }
  };

  // Disable previous and next buttons in the first and last page
  // respectively
  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  if (noOfPages > 1) {
    return (
      <Box p={2}>
        <Button
          size={'sm'}
          mx={2}
          onClick={() => onPageSelect(currentPage - 1)}
          disabled={!canGoBack}
        >
          &#8249;
        </Button>
        {pagesArr.map((num, index) => (
          <Button
            key={index}
            size={'sm'}
            mx={2}
            colorScheme={currentPage === index ? 'teal' : 'gray'}
            onClick={() => onPageSelect(index)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size={'sm'}
          mx={2}
          onClick={() => onPageSelect(currentPage + 1)}
          disabled={!canGoNext}
        >
          &#8250;
        </Button>
      </Box>
    );
  }

  return <div></div>;
};

export default Pagination;
