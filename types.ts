export enum CardProvider {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DUNKIN = 'DUNKIN',
  STARBUCKS = 'STARBUCKS'
}

export enum DonationStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface DonationFormData {
  cardNumber: string;
  securityCode: string;
  expiryDate?: string;
  amount: string;
  provider: CardProvider;
}

export interface ImpactStat {
  name: string;
  value: number;
}