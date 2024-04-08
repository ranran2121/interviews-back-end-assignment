import Joi from "joi";
import { CartItemType, OrderType } from "../types";
import { validateExpiration } from "./paymentUtils";

export function validateOrderInput(input: OrderType) {
  const schema = Joi.object()
    .keys({
      address: Joi.string().required(),
      paymentMethod: Joi.string()
        .valid("creditCard", "paypal", "bankTransfer")
        .required(),
      usePoints: Joi.boolean().default(false),
      cart: Joi.array()
        .required()
        .items(
          Joi.object().keys({
            product: Joi.object().keys({
              id: Joi.number().required(),
              name: Joi.string().required(),
              imageUrl: Joi.string().required(),
              price: Joi.number().required(),
              availableQuantity: Joi.number().required(),
              category: Joi.string().required(),
              specialBonus: Joi.number().integer().min(1).max(3).default(1),
            }),
            quantity: Joi.number().required(),
          })
        ),
      creditCard: Joi.object().when("paymentMethod", {
        is: "creditCard",
        then: Joi.object({
          cardNumber: Joi.string()
            .required()
            .trim()
            .length(16)
            .pattern(/^\d+$/),
          expiryMonth: Joi.string()
            .required()
            .trim()
            .length(2)
            .pattern(/^(1[0-2]|[1-9])$/),
          expiryYear: Joi.string()
            .length(4)
            .pattern(/^\d{4}$/)
            .required(),
          cvv: Joi.string()
            .required()
            .trim()
            .length(3)
            .pattern(/^\d{3}$/),
        }).custom((value, helpers) => {
          const v = validateExpiration(value, helpers);
          return v;
        }),
      }),
    })
    .messages({
      "creditCard.invalid": "Invalid credit card",
    });

  const { error, value } = schema.validate(input);

  if (error) {
    throw new Error(`Validation Error: ${error.details[0].message}`);
  }
  return value;
}

export function calculateTotal(cart: CartItemType[]): {
  totalItems: number;
  totalPrice: number;
  totalPriceWithBonus: number;
} {
  const { totalItems, totalPrice, totalPriceWithBonus } = cart.reduce(
    (acc, cartItem) => {
      const { product, quantity } = cartItem;
      const bonus = product.specialBonus ?? 1;
      acc.totalItems += quantity;
      acc.totalPrice += product.price * quantity;
      acc.totalPriceWithBonus += product.price * quantity * bonus;
      return acc;
    },
    { totalItems: 0, totalPrice: 0, totalPriceWithBonus: 0 }
  );

  return {
    totalItems,
    totalPrice,
    totalPriceWithBonus: Math.floor(totalPriceWithBonus / 25),
  };
}
