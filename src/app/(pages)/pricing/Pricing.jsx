"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";

function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md border ${className || ""}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

const userPlans = [
  {
    name: "Pre",
    price: "$25",
    period: "/month",
    description: "Great for individuals just getting started.",
    features: ["5 assessments/month", "Basic templates", "Email support", "Community access"],
    popular: false,
  },
  {
    name: "Mid",
    price: "$50",
    period: "/month",
    description: "Best for professionals who need unlimited usage.",
    features: ["Unlimited assessments", "Premium templates", "Priority support", "Advanced AI features", "Export to PDF/CSV"],
    popular: true,
  },
  {
    name: "Pro",
    price: "$80",
    period: "/month",
    description: "Perfect for small teams and power users.",
    features: [
      "Unlimited assessments",
      "Premium templates",
      "Priority support",
      "Advanced AI",
      "Custom AI models",
      "24/7 phone support",
      "Team collaboration",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Dynamically load Razorpay checkout script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  const handlePayment = (plan) => async () => {
    if (!razorpayLoaded) {
      alert("Payment gateway is loading, please try again in a moment.");
      return;
    }

    try {
      // 1️⃣ Create order via backend
      const { data } = await axios.post("/api/razorpay/order", { plan });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Your App Name",
        description: `${plan} Plan Subscription`,
        order_id: data.order.razorpayOrderId,
        handler: async function (response) {
          // 2️⃣ Verify payment in backend
          const verifyRes = await axios.post("/api/razorpay/verify", response);
          if (verifyRes.data.success) {
            alert("Payment successful! Your subscription has been upgraded.");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#1d4ed8" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while initiating payment.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Pricing</h1>
        <p className="text-lg text-gray-600">Choose the plan that best fits your needs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-20">
        {userPlans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-blue-600 ring-2 ring-blue-600" : ""}`}>
            <CardContent className="flex flex-col flex-1">
              {plan.popular && (
                <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full self-start mb-3">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <div className="text-3xl font-extrabold mb-4">
                {plan.price}
                <span className="text-lg font-medium">{plan.period}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button className="w-full" onClick={handlePayment(plan.name.toLowerCase())}>
                  Choose {plan.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Not sure which plan is right for you? Our team is here to help you pick the best option for your needs.
        </p>
        <Button>Contact Us</Button>
        <p className="text-sm text-gray-500 mt-4">
          All plans come with a 14-day free trial. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
