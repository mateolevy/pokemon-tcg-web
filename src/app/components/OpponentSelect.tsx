import { useState } from "react";
import AsyncSelect from "react-select/async";
import { CardDto } from "../types";
import { CardsService } from "../services/cardsService";
import { GroupBase, OptionsOrGroups } from "react-select";
import { Box } from "@chakra-ui/react";
const OpponentSelect = ({
  onSelect,
}: {
  onSelect: (opponentId: string) => void;
}) => {
  const [selectedOpponent, setSelectedOpponent] = useState<CardDto | null>(
    null
  );

  const loadOptions = async (
    inputValue: string
  ): Promise<OptionsOrGroups<CardDto, GroupBase<CardDto>>> => {
    try {
      const response = await CardsService.getAllCards({
        page: 1,
        limit: 10,
        name: inputValue,
      });

      return response.data.map((card) => ({
        ...card,
        value: card.id,
        label: card.name,
      }));
    } catch (err) {
      console.error("Failed to load opponents", err);
      return [];
    }
  };

  const handleChange = (selectedOption: any) => {
    setSelectedOpponent(selectedOption);
    onSelect(selectedOption.value);
  };

  return (
    <Box mb={2}>
      <AsyncSelect<CardDto>
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        onChange={handleChange}
        value={selectedOpponent}
        placeholder="Select an opponent"
      />
    </Box>
  );
};

export default OpponentSelect;
