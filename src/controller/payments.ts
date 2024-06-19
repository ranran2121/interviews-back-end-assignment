export function postPayment() {
  const coverage = Math.floor(Math.random() * 900000000) + 100000000;

  if (coverage < 400000000) {
    return {
      transactionId: `tx_${coverage}`,
      status: "approved",
    };
  } else if (coverage >= 400000000 && coverage < 700000000) {
    return {
      transactionId: `tx_${coverage}`,
      status: "declined",
    };
  } else {
    return {
      transactionId: `tx_${coverage}`,
      status: "error",
    };
  }
}
