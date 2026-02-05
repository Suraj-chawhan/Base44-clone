"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";

function Card({ children, className }) {
  return <div className={`bg-gradient-to-br from-white/90 via-amber-50/50 to-orange-50/40 rounded-2xl shadow-lg border-2 ${className || ""}`}>{children}</div>;
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-xl font-medium hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl ${className || ""}`}
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setReady(true);
      document.body.appendChild(script);
    } else {
      setReady(true);
    }
  }, []);

  const handlePayment = (plan) => async () => {
    if (!ready) return;

    try {
      const { data } = await axios.post("/api/razorpay/order", { plan });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Your App Name",
        description: `${plan.toUpperCase()} Plan Subscription`,
        handler: async (response) => {
          const verify = await axios.post("/api/razorpay/verify", response);
          if (verify.data.success) {
            alert("Payment successful. Subscription activated.");
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: { color: "#ea580c" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Unable to start payment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/40 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-slate-900">Choose Your Plan</h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Select the perfect plan for your interview preparation journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {userPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col transform hover:-translate-y-2 transition-all duration-300 ${
                plan.popular ? "ring-4 ring-orange-400/30 border-orange-300" : "border-orange-100"
              }`}
            >
              <CardContent className="flex flex-col flex-1">
                {plan.popular && (
                  <div className="mb-4 -mt-2">
                    <span className="text-xs bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-1.5 rounded-full inline-block font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-lg font-medium text-slate-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="mt-auto w-full py-3 text-base" 
                  onClick={handlePayment(plan.name.toLowerCase())}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 max-w-4xl mx-auto border-2 border-orange-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Need a custom plan?</h3>
            <p className="text-slate-700 mb-6">
              Contact our sales team for enterprise solutions and volume discounts.
            </p>
            <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-slate-600">
          <p>All plans include a 14-day money-back guarantee. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}