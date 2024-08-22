import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Box
      width="100%"
      height="400px"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      p={4}
      bg="white"
    >
      <Skeleton height="150px" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} width="50%" />
    </Box>
  );
};

export default CardSkeleton;
