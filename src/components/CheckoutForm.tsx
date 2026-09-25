"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  quantity: "1" | "2";
  notes: string;
};

export default function CheckoutForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: "1",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ orderId: string } | null>(null);
  const [error, setError] = useState("");

  const price = form.quantity === "1" ? 293 : 499;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }
    if (form.phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: "COD",
          amount: price,
          product: form.quantity === "1" ? "Glow Pure Duo (1 pack)" : "Glow Pure Duo (2 packs)",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSuccess({ orderId: data.orderId });
    } catch (err: any) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-8 md:p-10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium mb-2">Order Confirmed</h3>
        <p className="text-[#8a857a] mb-6">
          Thank you. Your Cash on Delivery order has been placed successfully.
        </p>
        <div className="bg-[#0a0a0b] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#8a857a]">Order ID</p>
          <p className="text-lg font-mono tracking-wider text-amber-400">{success.orderId}</p>
        </div>
        <p className="text-sm text-[#8a857a]">
          We will contact you shortly on WhatsApp / call for confirmation.
          <br />
          Free shipping · Pay when you receive.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, quantity: "1" }))}
          className={`relative p-4 rounded-xl border transition-all ${
            form.quantity === "1"
              ? "border-amber-500/60 bg-amber-500/10"
              : "border-[#2a2a2e] bg-[#141416] hover:border-[#3a3a3e]"
          }`}
        >
          <p className="font-medium">1 Pack</p>
          <p className="text-sm text-[#8a857a]">2 × 100g</p>
          <p className="mt-2 text-lg text-amber-400">₹293</p>
        </button>
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, quantity: "2" }))}
          className={`relative p-4 rounded-xl border transition-all ${
            form.quantity === "2"
              ? "border-amber-500/60 bg-amber-500/10"
              : "border-[#2a2a2e] bg-[#141416] hover:border-[#3a3a3e]"
          }`}
        >
          <span className="absolute -top-2 right-3 text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-medium">
            BEST VALUE
          </span>
          <p className="font-medium">2 Packs</p>
          <p className="text-sm text-[#8a857a]">4 × 100g</p>
          <p className="mt-2 text-lg text-amber-400">₹499</p>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#8a857a] mb-1.5">Full Name *</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm text-[#8a857a] mb-1.5">Phone *</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" placeholder="10-digit mobile number" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#8a857a] mb-1.5">Email (optional)</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" placeholder="you@example.com" />
      </div>

      <div>
        <label className="block text-sm text-[#8a857a] mb-1.5">
          Full Delivery Address * <span className="text-xs">(also used as billing address)</span>
        </label>
        <textarea name="address" value={form.address} onChange={handleChange} required rows={3} className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition resize-none" placeholder="House / Flat / Street, Landmark" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-[#8a857a] mb-1.5">City *</label>
          <input name="city" value={form.city} onChange={handleChange} required className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" />
        </div>
        <div>
          <label className="block text-sm text-[#8a857a] mb-1.5">State *</label>
          <input name="state" value={form.state} onChange={handleChange} required className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm text-[#8a857a] mb-1.5">Pincode *</label>
          <input name="pincode" value={form.pincode} onChange={handleChange} required className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" placeholder="6 digits" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#8a857a] mb-1.5">Order Notes (optional)</label>
        <input name="notes" value={form.notes} onChange={handleChange} className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500/50 transition" placeholder="Any special instructions" />
      </div>

      <div className="bg-[#141416] border border-[#2a2a2e] rounded-xl p-5 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#8a857a]">Subtotal</span>
          <span>₹{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#8a857a]">Shipping</span>
          <span className="text-amber-400">FREE</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#8a857a]">Payment</span>
          <span>Cash on Delivery</span>
        </div>
        <div className="border-t border-[#2a2a2e] pt-3 flex justify-between font-medium text-lg">
          <span>Total</span>
          <span className="text-amber-400">₹{price}</span>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium text-lg hover:from-amber-500 hover:to-amber-400 transition disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Placing Order..." : `Place COD Order · ₹${price}`}
      </button>

      <p className="text-center text-xs text-[#8a857a]">
        Free shipping across India · Pay only when you receive the product
      </p>
    </form>
  );
}
