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

export interface SavingPlanPeriod {
  period: string;
}

export interface PlansResponse {
  plans: {
    saving: SavingPlan;
    transactional: TransactionalPlan;
  };
}

export interface Plan {
  planName: string;
}

export interface SavingPlan extends Plan {
  id: SavingPlanType;
  interestRate: number | null;
  paymentStepPeriod: SavingPlanPeriod | null;
  totalPeriod: SavingPlanPeriod | null;
  initialSteps: number | null;
  additionAllowed: boolean;
}

export interface TransactionalPlan extends Plan {
  id: TramsactionalPlanType;
  creditMoneyAmount: number;
  lendingRate: number;
  lendingAvailable: boolean;
}

export interface Account {
  id: number;
  accountType: AccountType;
  accountStatus: AccountStatus;
  accountName: string;
  balance: BalanceInfo;
  user: User;
  card: Card;
  creditMoneyAmount?: number;
  lendingRate: number;
  default: boolean;
  lendingAvailable: boolean;
  paymentStepsLeft?: number;
  accumulateStartTime?: number;
  autoRenewal?: boolean;
  cumulativeAmount?: number;
  currentEstimatedAmount?: number;
  daysUntilNextPayment?: number;
  capitalizationOn?: boolean;
  savingAccountPlan: SavingPlan;
}

export interface AccountInfo {
  card: Card;
  atm: AtmInfo;
}

export interface BalanceInfo {
  currency: string;
  amount: number;
}

export interface User {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  birthdayDate: string | null;
  userStatus: UserStatus;
}

export interface Card {
  number: number;
  cardStatus: CardStatus;
  user: User;
  bank: Bank
}

export type Currencies = string[];

export interface Transaction {
  transactionStatus: TransactionStatus;
  startTime: number;
  amount: BalanceInfo;
  toAccount: {id: number};
  fromAccount: {id: number};
  transactionType: TransactionType;
  modifyTime: number;
  id: number;
}

export enum AtmStatus {
  IDLE = 'IDLE',
  DOWN = 'DOWN',
  UPDATING = 'UPDATING',
  IN_USAGE = 'IN_USAGE'
}

export enum AccountType {
  TRANSACTIONAL = 'TRANSACTIONAL',
  SAVING = 'SAVING'
}

export enum AccountStatus {
  OK = 'OK',
  FROZEN = 'FROZEN',
  TERMINATED = 'TERMINATED',
  ACCUMULATING = 'ACCUMULATING'
}

export enum AtmState {
  LOGIN = 'Login',
  MAIN_MENU = 'Main menu',
  MY_ACCOUNTS = 'My accounts',
  NEW_TRANSACTION = 'New transaction',
  WITHDRAW = 'Withdraw',
  DEPOSIT = 'Deposit',
  TRANSACTION_HISTORY = 'Transaction history',
  CARD_INFO = 'Card info',
  NEW_ACCOUNT = 'New account',
  CHOOSE_PLAN = 'Choose your plan',
  ACCOUNT_INFO = 'Account info',
  CHANGE_PIN = 'Change pin code',
  CHANGE_ACCOUNT_PLAN = 'Change plan'
}

export enum CardStatus {
  BLOCKED = 'BLOCKED',
  IN_USAGE = 'IN_USAGE',
  CHEWED = 'CHEWED',
  OK = 'OK'
}

export enum TransactionStatus {
  COMMITTED = 'COMMITTED',
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED',
  SCHEDULED = 'SCHEDULED'
}

export enum TransactionType {
  TRANSFERRING = 'TRANSFERRING',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT'
}

export enum UserStatus {
  OK = 'OK',
  FROZEN = 'FROZEN',
  BLOCKED = 'BLOCKED',
  SUSPENDED = 'SUSPENDED'
}

export enum SavingPlanType {
  PLAIN = 'PLAIN',
  STANDARD = 'STANDARD',
  LONG = 'LONG',
  QUICK = 'QUICK',
  EXTRA_QUICK = 'EXTRA_QUICK'
}

export enum TramsactionalPlanType {
  PLAIN = 'PLAIN',
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM'
}