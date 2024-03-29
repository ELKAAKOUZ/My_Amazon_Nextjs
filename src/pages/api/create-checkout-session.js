const stripe = require("stripe")(
  "sk_test_51K47EzKYBNmUtqWsfOCm8lKVmhdVnfT8qaPnGhtS1VJXPpjJAwbreBDkXI1lGHSnZlQnchQXzscGy6cHOAaCBo8P00fUXZMuwI"
);
export default async (req, res) => {
  const { items, email } = req.body;
  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    description: item.description,
    price_data: {
      currency: "eur",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));
  // console.log(transformedItems);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1K4FfSKYBNmUtqWshycaucjN"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};
