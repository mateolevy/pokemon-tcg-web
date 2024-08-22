import {
  Box,
  Button,
  Select,
  HStack,
  VStack,
  Text,
  Input,
  useBreakpointValue,
  StackDirection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardsService } from "../services/cardsService";

interface FilterProps {
  onFilterChange: (filters: {
    name?: string;
    typeId?: string;
    setId?: string;
  }) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [name, setName] = useState<string>("");
  const [typeId, setTypeId] = useState<string>("");
  const [setId, setSetId] = useState<string>("");

  const [types, setTypes] = useState<{ id: string; name: string }[]>([]);
  const [sets, setSets] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await CardsService.getCardMetadata();
        setTypes(metadata.types);
        setSets(metadata.sets);
      } catch (err) {
        setError("Failed to load metadata");
        console.error(err);
      }
    };

    fetchMetadata();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({ name, typeId, setId });
  };

  const stackDirection = useBreakpointValue({
    base: "column",
    md: "row",
  }) as StackDirection;

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={4} align="stretch" mb={4}>
      <HStack
        spacing={4}
        width="100%"
        direction={stackDirection}
        alignItems="flex-start"
        wrap="wrap"
      >
        <Box flex="1">
          <Input
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            width="100%"
          />
        </Box>
        <Box flex="1">
          <Select
            placeholder="Filter by type"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            width="100%"
          >
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box flex="1">
          <Select
            placeholder="Filter by set"
            value={setId}
            onChange={(e) => setSetId(e.target.value)}
            width="100%"
          >
            {sets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Button colorScheme="blue" onClick={handleFilterChange} width="100%">
            Apply Filters
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Filter;
