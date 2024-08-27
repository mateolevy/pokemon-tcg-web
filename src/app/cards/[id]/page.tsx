"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  VStack,
  HStack,
  Spinner,
  Text,
  useBreakpointValue,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { CardDto, BattleResultDto } from "../../types";
import { CardsService } from "../../services/cardsService";
import OpponentSelect from "../../components/OpponentSelect";
import withAuth from "@/app/hocs/withAuth";

const CardDetail = ({
  onBattle,
}: {
  onBattle?: (selectedCardId: string) => void;
}) => {
  const { id } = useParams();
  const [card, setCard] = useState<CardDto | null>(null);
  const [availableOpponents, setAvailableOpponents] = useState<CardDto[]>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<CardDto | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [battleLoading, setBattleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [battleResult, setBattleResult] = useState<BattleResultDto | null>(
    null
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setLoading(true);
        const fetchedCard = await CardsService.getCardById(id as string);
        setCard(fetchedCard);

        const fetchedOpponents = await CardsService.getAllCards({
          page: 1,
          limit: 10,
        });
        // No filtering here, so the same card can be selected as the opponent
        setAvailableOpponents(fetchedOpponents.data);
      } catch (err) {
        setError("Failed to load card details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleBattleClick = async () => {
    if (selectedOpponent) {
      try {
        setBattleLoading(true);
        const result = await CardsService.simulateBattle(
          id as string,
          selectedOpponent.id
        );
        setBattleResult(result);
        if (onBattle) {
          onBattle(selectedOpponent.id);
        }
      } catch (err) {
        setError("Failed to simulate battle");
        console.error(err);
      } finally {
        setBattleLoading(false);
      }
    }
  };

  const handleOpponentSelect = (opponentId: string) => {
    const opponent = availableOpponents.find((card) => card.id === opponentId);
    setSelectedOpponent(opponent || null);
  };

  if (loading) {
    return (
      <Center height="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="subtle">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!card) {
    return (
      <Center height="80vh">
        <Text fontSize="2xl" color="gray.500">
          Card not found.
        </Text>
      </Center>
    );
  }
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="center">
        <OpponentSelect onSelect={handleOpponentSelect} />

        <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
          {isMobile ? (
            <VStack spacing={4}>
              <Card card={card} />
              <Text fontSize="2xl" fontWeight="bold">
                VS
              </Text>
              {selectedOpponent && <Card card={selectedOpponent} />}
            </VStack>
          ) : (
            <HStack spacing={4} align="center">
              <Card card={card} />
              <Text fontSize="2xl" fontWeight="bold">
                VS
              </Text>
              {selectedOpponent && <Card card={selectedOpponent} />}
            </HStack>
          )}
        </Box>

        <Button
          colorScheme="blue"
          onClick={handleBattleClick}
          isDisabled={!selectedOpponent || battleLoading}
          isLoading={battleLoading}
          loadingText="Battling..."
        >
          Battle!
        </Button>

        {battleResult && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text>
              Result: {card.name}{" "}
              {battleResult.successful
                ? "wins in a single attack"
                : "does not win in a single attack"}
            </Text>
            <Text>Base Damage: {battleResult.baseDamage}</Text>
            <Text>Damage Dealt: {battleResult.finalDamage}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default withAuth(CardDetail);
