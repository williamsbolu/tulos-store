"use server";

import stripe from "@/lib/stripe";
import { CartItem } from "@/store";
import { Product } from "@/sanity.types";
import Stripe from "stripe";
import { urlFor } from "@/sanity/lib/image";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata: Metadata
) {
  try {
    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id }, // pass the product id
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
    };

    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      // if we dont have the customer ID
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
