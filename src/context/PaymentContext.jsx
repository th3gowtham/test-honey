import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";

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

      // Create enrollment record first with pending status
      const enrollmentData = {
        courseId: course.id,
        userId: user.uid,
        userEmail: user.email,
        userName: userName || user.displayName || '',
        courseName: course.title,
        courseFee: course.fee,
        paymentStatus: "Pending",
        paymentId: null,
        paymentOrderId: null,
        enrolledAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const enrollmentRef = await addDoc(collection(db, "enrollments"), enrollmentData);
      console.log("Enrollment created with ID:", enrollmentRef.id);

      // Create Razorpay order
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.fee,
          name: userName || user.displayName || '',
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

      // Update enrollment with order ID
      await updateDoc(doc(db, "enrollments", enrollmentRef.id), {
        paymentOrderId: orderId,
        updatedAt: serverTimestamp()
      });

      const options = {
        key: keyId,
        amount: course.fee * 100,
        currency: "INR",
        name: "The Honey Bee",
        description: `Payment for ${course.title}`,
        order_id: orderId,
        handler: function (razorpayResponse) {
          // Payment initiated successfully
          console.log("Payment response:", razorpayResponse);
          toast.success("Payment initiated, you will receive confirmation shortly!");

          // Note: The webhook will handle the actual payment verification and status update
          // No need to update Firestore here as the webhook will do it securely
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal dismissed");
            // You can add any cleanup logic here if needed
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

