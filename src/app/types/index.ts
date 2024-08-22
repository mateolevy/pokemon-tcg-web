export interface CreateCardDto {
  name: string;
  hp: number;
  imageUrl?: string;
  typeId: string;
  rarityId: string;
  setId: string;
  attacks: CreateAttackDto[];
  weaknesses: CreateWeaknessDto[];
  resistances: CreateResistanceDto[];
}

export interface CreateAttackDto {
  name: string;
  text: string;
  damage: number;
}

export interface CreateWeaknessDto {
  typeId: string;
  multiplier: number;
}

export interface CreateResistanceDto {
  typeId: string;
  value: number;
}

export interface CardDto {
  id: string;
  name: string;
  hp: number;
  imageUrl: string;
  type: string;
  rarity: string;
  set: string;
  attacks: AttackDto[];
  weaknesses: WeaknessDto[];
  resistances: ResistanceDto[];
}

export interface AttackDto {
  name: string;
  damage: number;
  text: string;
}

export interface BattleResultDto {
  attackingCardName: string;
  defendingCardName: string;
  defendingCardHealth: number;
  baseDamage: number;
  finalDamage: number;
  weaknessApplied: boolean;
  resistanceApplied: boolean;
  successful: boolean;
}

export interface WeaknessDto {
  multiplier: number;
  type: string;
}

export interface ResistanceDto {
  value: number;
  type: string;
}

export interface FindCardsQueryDto {
  name?: string;
  setId?: string;
  typeId?: string;
  page: number;
  limit: number;
}

export class PaginatedResultDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}
