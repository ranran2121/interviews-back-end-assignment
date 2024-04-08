export type ProductType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  availableQuantity: number;
  category: string;
  specialBonus?: number;
};

export type CreditCardType = {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
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
  usePoints?: boolean;
};

export type PaymentType = CreditCardType & {
  amount: number;
};

export type DiscountItemType = {
  id: number;
  percentage: number;
  startDate: string;
  endDate: string;
  productId: number;
};
