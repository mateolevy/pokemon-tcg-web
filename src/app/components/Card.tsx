import { Box, Image, Text, Flex, Spacer, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { CardDto } from "../types";

const raritySymbolMap: { [key: string]: string } = {
  Rare: "★", // Star for Rare
  Uncommon: "◆", // Circle for Uncommon
  Common: "●", // Square for Common
};

const typeStyleMap: { [key: string]: { symbol: string; bgColor: string } } = {
  Normal: { symbol: "🔘", bgColor: "gray.200" }, // Circle for Normal
  Fire: { symbol: "🔥", bgColor: "red.100" }, // Fire for Fire
  Water: { symbol: "💧", bgColor: "blue.100" }, // Water drop for Water
  Electric: { symbol: "⚡", bgColor: "yellow.100" }, // Lightning bolt for Electric
  Grass: { symbol: "🌿", bgColor: "green.100" }, // Leaf for Grass
  Ice: { symbol: "❄️", bgColor: "cyan.100" }, // Snowflake for Ice
  Fighting: { symbol: "🥊", bgColor: "orange.100" }, // Boxing glove for Fighting
  Poison: { symbol: "☠️", bgColor: "purple.100" }, // Skull and crossbones for Poison
  Ground: { symbol: "🌍", bgColor: "brown.200" }, // Globe for Ground
  Flying: { symbol: "🕊️", bgColor: "skyblue.100" }, // Dove for Flying
  Psychic: { symbol: "🔮", bgColor: "purple.200" }, // Crystal ball for Psychic
  Bug: { symbol: "🐛", bgColor: "green.200" }, // Bug for Bug
  Rock: { symbol: "🪨", bgColor: "gray.300" }, // Rock for Rock
  Ghost: { symbol: "👻", bgColor: "purple.700" }, // Ghost for Ghost
  Dragon: { symbol: "🐉", bgColor: "teal.100" }, // Dragon for Dragon
  Dark: { symbol: "🌑", bgColor: "gray.700" }, // Dark moon for Dark
  Steel: { symbol: "⚙️", bgColor: "gray.300" }, // Gear for Steel
  Fairy: { symbol: "✨", bgColor: "pink.100" }, // Sparkles for Fairy
};

const Card = ({ card }: { card: CardDto }) => {
  const typeStyle = typeStyleMap[card.type] || {
    symbol: "",
    bgColor: "gray.100",
  };

  const raritySymbol = raritySymbolMap[card.rarity] || "";

  return (
    <Link href={`/cards/${card.id}`}>
      <Box
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg={typeStyle.bgColor}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
        width="280px" // Width of a typical Pokémon card
        height="400px" // Height of a typical Pokémon card
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {/* Top Section: Name, HP, Image, Attacks, Weaknesses, and Resistances */}
        <Box>
          <Flex align="center" mb={2}>
            <Text fontWeight="bold" fontSize="lg" isTruncated>
              {card.name}
            </Text>
            <Spacer />
            <Text fontWeight="bold" color="red.500">
              HP {card.hp} {typeStyle.symbol}
            </Text>
          </Flex>

          <Box
            border="1px solid"
            borderColor="gray.300"
            bg="gray.300"
            borderRadius="md"
            overflow="hidden"
            mb={2}
          >
            <Image
              src={card.imageUrl}
              alt={card.name}
              objectFit="contain"
              width="100%"
              height="150px"
            />
          </Box>

          <Box mb={2}>
            {card.attacks.map((attack, index) => (
              <Flex
                key={index}
                align="center"
                mb={1}
                p={2}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                bg="yellow.50"
              >
                <Text fontSize="md" fontWeight="bold">
                  {attack.name}
                </Text>
                <Spacer />
                <Text fontSize="md" fontWeight="bold" color="red.500">
                  {attack.damage}
                </Text>
              </Flex>
            ))}
          </Box>

          <Flex mb={2}>
            <Box>
              <Text fontSize="xs" color="gray.500">
                Weaknesses
              </Text>
              {card.weaknesses.map((weakness, index) => {
                const weaknessStyle = typeStyleMap[weakness.type] || {
                  symbol: weakness.type,
                  bgColor: "gray.100",
                };
                return (
                  <Text fontSize="xs" key={index} fontWeight="medium">
                    {weaknessStyle.symbol} x{weakness.multiplier}
                  </Text>
                );
              })}
            </Box>
            <Spacer />
            <Box>
              <Text fontSize="xs" color="gray.500">
                Resistances
              </Text>
              {card.resistances.map((resistance, index) => {
                const resistanceStyle = typeStyleMap[resistance.type] || {
                  symbol: resistance.type,
                  bgColor: "gray.100",
                };
                return (
                  <Text fontSize="xs" key={index} fontWeight="medium">
                    {resistanceStyle.symbol} {resistance.value}
                  </Text>
                );
              })}
            </Box>
          </Flex>
        </Box>

        {/* Bottom Section: Rarity and Set Info */}
        <Flex justifyContent="space-between" align="center">
          <Text
            fontSize="xs"
            color="gray.500"
            isTruncated
            maxWidth="100%"
            fontWeight="medium"
          >
            Set: {card.set}
          </Text>
          <Text fontSize="lg" color="gray.700">
            {raritySymbol}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default Card;
