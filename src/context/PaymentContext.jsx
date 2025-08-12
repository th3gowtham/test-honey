import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { user, userRole, userName } = useAuth();
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
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.fee,
          name: userName || '',
          email: user.email,
          courseName: course.title
        }),
      });
      const orderPayload = await response.json();
      if (!response.ok) {
        const reason = orderPayload?.details || orderPayload?.error || "Failed to create order";
        throw new Error(reason);
      }
      const { orderId, keyId } = orderPayload;
      const options = {
        key: keyId,
        amount: course.fee * 100,
        currency: "INR",
        name: "The Honey Bee",
        description: `Payment for ${course.title}`,
        order_id: orderId,
        handler: async function (razorpayResponse) {
          try {
            // Show success toast immediately
            toast.success("Payment successful!");

            // Skip backend verification and directly update Firestore
            const enrollmentsRef = collection(db, "enrollments");
            const q = query(
              enrollmentsRef,
              where("courseId", "==", course.id),
              where("userId", "==", user.uid),
              where("paymentStatus", "==", "Pending")
            );

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              // Update the most recent enrollment if multiple exist
              const enrollmentDoc = querySnapshot.docs[0];
              await updateDoc(doc(db, "enrollments", enrollmentDoc.id), {
                paymentStatus: "Paid",
                paymentId: razorpayResponse.razorpay_payment_id,
                paymentOrderId: razorpayResponse.razorpay_order_id
              });
            }
          } catch (error) {
            console.error("Error updating enrollment status:", error);
            toast.error("Failed to update enrollment status: " + error.message);
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
