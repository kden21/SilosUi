export interface SilosDto {
  uuid: string;
  id: number;
  name: string;
  culture: string;
  gorchak: number | null | undefined;
  protein: number | null | undefined;
  bug: number | null | undefined;
  sornaya: number | null | undefined;
  zernovaya: number | null | undefined;
  idk: number | null | undefined;
  nature: number | null | undefined;
  humidity: number | null | undefined;
  startDate: Date | null | undefined;
  harvestYear: Date | null | undefined;
  class: number | null | undefined;
  gluten: number | null | undefined;
  fullness: number | null | undefined;
  totalFootage: number | null | undefined;
  freeFootage: number | null | undefined;
  additionalInfo: string | null | undefined;
  /*[key: number]: number; // или более конкретный тип вместо any*/
}

export interface SilosCardDto {
  silos: SilosDto;
}
