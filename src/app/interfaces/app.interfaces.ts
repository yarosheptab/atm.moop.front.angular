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

export interface PlansResponse {
  
}

export interface Plan {

}

export enum AtmStatus {
  IDLE = 'IDLE',
  // add
}

export enum AtmStates {
  LOGIN = 'LOGIN',
  MAIN_MENU = 'MAIN_MENU',
}