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

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

export type OrderType = {
  cart: CartItemType[];
  address: string;
  paymentMethod: "creditCard" | "paypal" | "bankTransfer";
  creditCard?: CreditCardType;
};
