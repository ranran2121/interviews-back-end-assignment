import axios from "axios";
let productList = [
  {
    id: 5,
    name: "cat",
    imageUrl: "aaa",
    price: 10,
    category: "Beverages",
    availableQuantity: 10,
    specialBonus: 1,
  },
];

const baseUrl = "http://localhost:4000/api/orders";
const order = {
  creditCard: {
    cardNumber: "4111111111111111",
    expiryMonth: "12",
    expiryYear: "2028",
    cvv: "123",
  },
  address: "via",
  paymentMethod: "creditCard",
  usePoints: true,
  cart: [
    {
      product: {
        id: 5,
        name: "cat",
        imageUrl: "aaa",
        price: 10,
        availableQuantity: 10,
        category: "cat",
      },
      quantity: 3,
    },
    {
      product: {
        id: 2,
        name: "cat",
        imageUrl: "aaa",
        price: 10,
        availableQuantity: 10,
        category: "cat",
        specialBonus: 2,
      },
      quantity: 5,
    },
  ],
};

const updateList = (cart: any[]) => {
  const updatedList = productList.map((product) => {
    const cartItem = cart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (cartItem) {
      product.availableQuantity -= cartItem.quantity;
    }
    return product;
  });
  return updatedList;
};

const makeRequest = async () => {
  try {
    const response = await axios.post(baseUrl, order);
    console.log(
      `Status: ${response.status} - Data: ${JSON.stringify(response.data)}`
    );
    productList = updateList(order.cart);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

const sendConcurrentRequests = async (numRequests: number) => {
  const requests = Array(numRequests)
    .fill(null)
    .map(() => makeRequest());
  await Promise.all(requests);
};

const testConcurrency = async () => {
  console.log("Starting concurrent requests...");
  const numRequests = 7; // Change this number to simulate more concurrent requests
  await sendConcurrentRequests(numRequests);
  console.log("UPDATED, ", productList);
  console.log("Concurrent requests completed.");
};

testConcurrency();
