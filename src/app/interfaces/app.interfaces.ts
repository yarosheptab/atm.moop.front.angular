export interface AtmInfo {
    id: number;
    address: string;
    atmStatus: AtmStatus;
    banks: Bank[];
}

export interface Bank {
  id: number;
  name: string;
}

export enum AtmStatus {
  IDLE = 'IDLE',
  // add
}