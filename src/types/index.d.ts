export type ProductType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  availableQuantity: number;
  category: string;
};
export type CreditCardType = {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
};
