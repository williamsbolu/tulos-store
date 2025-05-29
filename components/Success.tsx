"use client";

import Link from "next/link";
import { useEffect } from "react";
import useCartStore from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");
  const { resetCart } = useCartStore();

  useEffect(() => {
    if (!orderNumber && !sessionId) {
      router.push("/");
    } else {
      // Reset the cart when the user visits the page while the payment has been successful
      resetCart();
    }
  }, [orderNumber, sessionId, resetCart, router]);

  return (
    <div className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <Check className="text-white w-12 h-12" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-gray-700">
            Order Number:{" "}
            <span className="text-black font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">
            What&apos;s Next?
          </h2>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>Check your email for order confirmation</li>
            <li>We&apos;ll notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>

        {/* <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Orders</h3>
          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order?._id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span className="text-gray-700 text-sm font-medium">
                  {order?._id}
                </span>
                <span className="text-sm font-medium px-2 py-1 bg-gray-200 rounded-full">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
