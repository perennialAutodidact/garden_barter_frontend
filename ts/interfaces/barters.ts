import { User } from "./auth";

export interface Barter {
  creator: User;
  title: string;
  description: string;
  dateCreated: Date;
  dateUpdated: Date;
  datExpires: Date;
  postal_code: string;
  willTradeFor: string;
  isFree: boolean;
}

export interface SeedBarter extends Barter {
  genus: string;
  species: string;
  commonName: string;
  datePackaged: Date;
}

export interface PlantBarter extends Barter {
  genus: string;
  species: string;
  commonName: string;
  age: string;
}

export interface ProduceBarter extends Barter {
  dateHarvested: Date;
}

export interface MaterialBarter extends Barter {}
export interface ToolBarter extends Barter {}

export interface BarterState {
  barters: (
    | Barter
    | SeedBarter
    | PlantBarter
    | ProduceBarter
    | MaterialBarter
    | ToolBarter
  )[];
  barterLoadingStatus: "PENDING" | "IDLE";
  page: number;
}

export interface BarterFormData {
  creator: User;
  title: string;
  description: string;
  postalCode: string;
  willTradeFor: string;
  isFree: boolean;
  
  // optional fields
  accessToken?: string;
  datePackaged?: Date;
  genus?: string;
  species?: string;
  commonName?: string;
  age?: string;
  dateHarvested?: Date;
}

export interface BartersHomePageProps {
    barters: Barter[]
}