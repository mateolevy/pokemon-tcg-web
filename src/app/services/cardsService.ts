// services/cardsService.ts

import axios from "axios";
import {
  CreateCardDto,
  CardDto,
  BattleResultDto,
  FindCardsQueryDto,
  PaginatedResultDto,
} from "../types"; // Import necessary types

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/cards",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const CardsService = {
  async createCard(createCardDto: CreateCardDto): Promise<CardDto> {
    const response = await apiClient.post<CardDto>("/", createCardDto);
    return response.data;
  },

  async getAllCards(
    query: FindCardsQueryDto
  ): Promise<PaginatedResultDto<CardDto>> {
    const response = await apiClient.get<PaginatedResultDto<CardDto>>("/", {
      params: query,
    });
    return response.data;
  },

  async getCardMetadata(): Promise<any> {
    // Replace `any` with the actual type if known
    const response = await apiClient.get("/metadata");
    return response.data;
  },

  async simulateBattle(
    attackingCardId: string,
    defendingCardId: string
  ): Promise<BattleResultDto> {
    const response = await apiClient.get<BattleResultDto>(
      `/battle/${attackingCardId}/${defendingCardId}`
    );
    return response.data;
  },

  async getWeaknessesAndResistances(
    cardId: string
  ): Promise<{ weaknesses: CardDto[]; resistances: CardDto[] }> {
    const response = await apiClient.get<{
      weaknesses: CardDto[];
      resistances: CardDto[];
    }>(`/${cardId}/weaknesses-resistances`);
    return response.data;
  },

  async getCardById(id: string): Promise<CardDto> {
    const response = await apiClient.get<CardDto>(`/${id}`);
    return response.data;
  },

  async updateCard(id: string, updateCardDto: CreateCardDto): Promise<CardDto> {
    const response = await apiClient.patch<CardDto>(`/${id}`, updateCardDto);
    return response.data;
  },

  async deleteCard(id: string): Promise<void> {
    await apiClient.delete(`/${id}`);
  },
};
