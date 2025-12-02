/* eslint-disable @typescript-eslint/no-explicit-any */
// types/order.types.ts (frontend)
export type PaymentMethod = 'COD' | 'ONLINE';
export type PaymentStatus = 'PAID' | 'UNPAID';

export interface IOrder {
  _id: string;
  user: string; // userId
  food: string; // foodId
  quantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

// types/payment.types.ts (frontend)
export interface IPayment {
  _id: string;
  user: string;
  order: string; // orderId
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paymentGatewayData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePaymentData {
  order: IOrder;
  payment?: IPayment;
  checkoutUrl?: string;
}
