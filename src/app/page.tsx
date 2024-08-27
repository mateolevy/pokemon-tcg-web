"use client";

import { useEffect, useState } from "react";
import { Container, SimpleGrid, Text, Box } from "@chakra-ui/react";
import Card from "./components/Card";
import { CardDto } from "./types";
import { CardsService } from "./services/cardsService";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import CardSkeleton from "./components/CardSkeleton";
import withAuth from "./hocs/withAuth";

function CardsPage() {
  const [cards, setCards] = useState<CardDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<{
    name?: string;
    typeId?: string;
    setId?: string;
  }>({});

  useEffect(() => {
    const defaultPageSize = 8;
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await CardsService.getAllCards({
          page: currentPage,
          limit: defaultPageSize,
          ...filters,
        });
        setCards(response.data);
        setTotalPages(Math.ceil(response.total / defaultPageSize));
      } catch (err) {
        setError("Failed to load cards");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: {
    name?: string;
    typeId?: string;
    setId?: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Filter onFilterChange={handleFilterChange} />
      {loading ? (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          justifyItems="center"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </SimpleGrid>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : cards.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" mb={4}>
            No cards available. Try adjusting your filters.
          </Text>
        </Box>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={8}
            justifyItems="center"
          >
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </SimpleGrid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
}

export default withAuth(CardsPage);
