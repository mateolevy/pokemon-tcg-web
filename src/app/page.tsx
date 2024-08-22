"use client";

import { useEffect, useState } from "react";
import { Container, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import Card from "./components/Card";
import { CardDto } from "./types";
import { CardsService } from "./services/cardsService";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import CardSkeleton from "./components/CardSkeleton";
export default function CardsPage() {
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
          limit: defaultPageSize, // Adjust based on the number of cards per page you want
          ...filters,
        });
        setCards(response.data);
        setTotalPages(Math.ceil(response.total / defaultPageSize)); // Adjust based on pageSize
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

  if (loading) {
    return (
      <Container maxW="container.xl" py={6}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          justifyItems="center"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </SimpleGrid>
      </Container>
    );
  }
  if (error) return <Text color="red.500">{error}</Text>;
  if (cards.length === 0) return <Text>No cards available</Text>;

  return (
    <Container maxW="container.xl" py={6}>
      <Filter onFilterChange={handleFilterChange} />
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
    </Container>
  );
}
