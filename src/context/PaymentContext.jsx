import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(false);

  const startPayment = async (course) => {
    // Log user and role for debugging
    console.log("[PaymentContext] user:", user, "userRole:", userRole);

    // Only allow students to pay
    if (userRole !== "Student") {
      toast.error("Only students can enroll in courses.");
      return;
    }
    if (!user || !user.email) {
      toast.error("Please login to enroll in the course");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.fee,
          name: user.displayName || '',
          email: user.email,
          courseName: course.title
        }),
      });
      const { orderId, keyId } = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }
      const options = {
        key: keyId,
        amount: course.fee * 100,
        currency: "INR",
        name: "The Honey Bee",
        description: `Payment for ${course.title}`,
        order_id: orderId,
        handler: async function (razorpayResponse) {
          try {
            const verifyResponse = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();
            if (verifyResponse.ok) {
              toast.success("Payment successful!");
            } else {
              toast.error(verifyData.error || "Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed: " + error.message);
          }
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        theme: { color: "#F7A4A4" }
      };
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      toast.error("Failed to process payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ startPayment, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
