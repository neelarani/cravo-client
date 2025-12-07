export interface IOrder {
  _id: string;
  user: string;
  food: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}
