import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, quantity } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sample Product",
            },
            unit_amount: amount,
          },
          quantity: quantity || 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/buy-now`,
    });

    return Response.json({ id: session.id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
