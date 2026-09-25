"use client";

import { useEffect, useState } from "react";

type Order = {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  quantity: string;
  notes: string;
  paymentMethod: string;
  amount: number;
  product: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((d) => {
          setOrders(d.orders || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-[#141416] border border-[#2a2a2e] rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-amber-500/50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && password === "glamgear2026") {
                setAuthenticated(true);
              }
            }}
          />
          <button
            onClick={() => {
              if (password === "glamgear2026") setAuthenticated(true);
              else alert("Wrong password");
            }}
            className="w-full py-3 rounded-lg bg-amber-600 text-black font-medium"
          >
            Enter
          </button>
          <p className="text-xs text-[#8a857a] mt-4 text-center">
            Default password: glamgear2026 (change later)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f0e8] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-light">Orders</h1>
            <p className="text-[#8a857a] text-sm">Glow Pure Duo · Admin</p>
          </div>
          <p className="text-sm text-amber-400">{orders.length} total orders</p>
        </div>

        {loading ? (
          <p className="text-[#8a857a]">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-[#8a857a]">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.orderId}
                className="bg-[#141416] border border-[#2a2a2e] rounded-xl p-5 md:p-6"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-amber-400">{o.orderId}</p>
                    <p className="text-sm text-[#8a857a]">
                      {new Date(o.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-amber-400">₹{o.amount}</p>
                    <p className="text-sm text-[#8a857a]">{o.paymentMethod}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#8a857a]">Customer</p>
                    <p>{o.fullName}</p>
                    <p>{o.phone}</p>
                    {o.email && <p>{o.email}</p>}
                  </div>
                  <div>
                    <p className="text-[#8a857a]">Address</p>
                    <p>
                      {o.address}, {o.city}, {o.state} – {o.pincode}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#2a2a2e] flex flex-wrap gap-4 text-sm">
                  <span>{o.product}</span>
                  <span className="text-amber-400">{o.status}</span>
                  {o.notes && <span className="text-[#8a857a]">Note: {o.notes}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
