import { Button, ButtonGroup, HStack } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <HStack justify="center" mt={4}>
      <ButtonGroup isAttached>
        <Button
          variant="outline"
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export default Pagination;
