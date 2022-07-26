import React, { RefObject, ReactNode, FormEventHandler, SyntheticEvent, FormEvent } from "react";
import { User } from "./auth";

export interface Barter {
  uuid: string;
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

type AnyBarter = (Barter
| SeedBarter
| PlantBarter
| ProduceBarter
| MaterialBarter
| ToolBarter);

export interface BarterState {
  barters: AnyBarter[];
  barterLoadingStatus: "PENDING" | "IDLE";
  activeBarter: AnyBarter;
  page: number;
}

export interface BarterFormData {
  title: string;
  description: string;
  postalCode: string;
  willTradeFor: string;
  isFree: boolean;
  barterType: string;
  
  // optional fields
  quantity?: number | string;
  quantityUnits?: string;
  datePackaged?: Date | string;
  genus?: string;
  species?: string;
  commonName?: string;
  age?: string;
  dateHarvested?: Date | string;
  latitude?: string;
  longitude?: string;
  crossStreet1?: string;
  crossStreet2?: string;
  dimensions?: string
}

export interface BartersHomePageProps {
  barters: Barter[];
}

export interface BarterListProps {
  barters: Barter[];
}
export interface BarterItemProps {
  barter: Barter;
  showAllFields?: boolean;
}

export interface BarterIconProps {
  barterType: string;
}

export interface ArrowButtonProps {
  ref: RefObject<HTMLElement[]>;
}
export interface BarterTypeRadioChoice {
  value: string;
  label: string;
}

export interface BarterTypeCheckboxOption {
  label: string;
  value: string;
}

export interface BarterFormSectionField {
  name: string;
  type: string;
  required: boolean;
//   errors: [] | string[];
  additionalProps: {
      defaultValue?: string | number 
      min?: number
  },
  label?: string;
  columnClasses?: string;
  choices?: BarterTypeRadioChoice[] | undefined;
  options?: object | object[] | undefined;
}

export interface BarterFormSectionData {
    name: string;
    headerText: string;
    number: string;
    fields: BarterFormSectionField[];
  };

export interface BarterFormSectionProps {
  sectionData: BarterFormSectionData;
  handleChange: FormEventHandler;
  handleSubmit: FormEventHandler;
  changeFormSection: Function;
  barterType: string;
  formData: BarterFormData;
  totalSections: string;
  isFirstSection: boolean;
  isLastSection: boolean;
  errors: BarterFormErrors;
  allFormSections: BarterFormSectionData[]
}

export interface BarterFormReviewSectionProps {
    formData: BarterFormData;
    allFormSections: BarterFormSectionData[]
}

export interface BarterFormInputProps {
    fields: BarterFormSectionField[];
    errors: BarterFormErrors;
    formData: BarterFormData;
    handleChange: FormEventHandler;
    handleSubmit: FormEventHandler;
}

export interface BarterFormErrors {
  title?:  string[]
  description?:  string[]
  postalCode?:  string[]
  willTradeFor?:  string[]
  isFree?:  string[]
  quantity?:  string[]
  quantityUnits?:  string[]
  barterType?:  string[]
  datePackaged?:  string[]
  genus?:  string[]
  species?:  string[]
  commonName?:  string[]
  age?:  string[]
  dateHarvested?:  string[]
  latitude?:  string[]
  longitude?:  string[]
  crossStreet1?:  string[]
  crossStreet2?:  string[]
}