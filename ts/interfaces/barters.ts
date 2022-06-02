import React, { RefObject, ReactNode } from "react";
import { User } from "./auth";

export interface Barter {
  id: number;
  creator: User;
  title: string;
  description: string;
  dateCreated: Date | string;
  dateUpdated: Date | string;
  dateExpires: Date | string;
  postalCode: string;
  willTradeFor: string;
  isFree: boolean;
  quantity?: number | string;
  quantityUnits?: string;
  barterType: string;
  latitude: string;
  longitude: string;
  crossStreet1: string;
  crossStreet2: string;
}

export interface SeedBarter extends Barter {
  genus?: string;
  species?: string;
  commonName?: string;
  datePackaged?: Date | string;
}

export interface PlantBarter extends Barter {
  genus?: string;
  species?: string;
  commonName?: string;
  age?: string;
}

export interface ProduceBarter extends Barter {
  dateHarvested?: Date | string;
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
  datePackaged?: Date | string;
  genus?: string;
  species?: string;
  commonName?: string;
  age?: string;
  dateHarvested?: Date | string;
}

export interface BartersHomePageProps {
    barters: Barter[]
}

export interface BarterListProps {
    barters: Barter[]
}
export interface BarterItemProps {
    barter: Barter
}

export interface BarterItemHeaderProps {
    icon: ReactNode;
    barterType: string;
}

export interface ArrowButtonProps {
    ref: RefObject<HTMLElement[]>
}