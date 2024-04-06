import Joi from "joi";
import { PaymentType } from "../types";

export function validatePaymentInput(input: PaymentType) {
  const schema = Joi.object()
    .keys({
      cardNumber: Joi.string().required().trim().length(16).pattern(/^\d+$/),
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
      amount: Joi.number().required(),
    })
    .custom((value, helpers) => {
      const v = validateExpiration(value, helpers);
      return v;
    });

  const { error, value } = schema.validate(input);

  if (error) {
    throw new Error(`Validation Error: ${error.details[0].message}`);
  }

  return value;
}

export function validateExpiration(
  value: { expiryMonth: any; expiryYear: any },
  helpers: { message: (arg0: { custom: string }) => any }
) {
  const { expiryMonth, expiryYear } = value;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (
    parseInt(expiryYear, 10) < currentYear ||
    (parseInt(expiryYear, 10) === currentYear &&
      parseInt(expiryMonth, 10) < currentMonth)
  ) {
    return helpers.message({
      custom: "Credit card is expired",
    });
  }

  return value;
}
