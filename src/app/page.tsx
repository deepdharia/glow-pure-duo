"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import CheckoutForm from "@/components/CheckoutForm";

const SoapScene = dynamic(() => import("@/components/SoapScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative">
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <SoapScene />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/90" />
        <div className="relative z-20 flex flex-col min-h-screen">
          <header className="flex items-center justify-between px-6 md:px-12 py-6">
            <div className="flex items-center gap-2">
              <span className="text-sm tracking-[0.2em] font-medium">GLAM GEAR</span>
              <span className="text-xs text-amber-500/80 tracking-widest">GLOBAL</span>
            </div>
            <a href="#order" className="text-sm tracking-wide border border-white/30 hover:border-amber-500/60 px-5 py-2 rounded-full transition">
              Shop Now
            </a>
          </header>
          <div className="flex-1 flex flex-col justify-end px-6 md:px-12 pb-20 max-w-3xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-amber-400/90 text-sm tracking-[0.25em] uppercase mb-4">
              Glow Pure Duo
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 glow-text">
              Everyday cleansing.<br /><span className="amber-gradient">Elevated.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-[#c4b8a8] text-lg md:text-xl max-w-md mb-10 leading-relaxed">
              A translucent glass-like soap. Coconut oil, saffron & sandalwood. Two 100g bars for a complete ritual.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex flex-wrap gap-4">
              <a href="#order" className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium hover:from-amber-500 hover:to-amber-400 transition">
                Order Now · Free Shipping
              </a>
              <a href="#story" className="px-8 py-4 rounded-full border border-white/25 hover:border-amber-500/50 transition text-sm tracking-wide">
                Discover the Ritual
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="story" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-4">The Formulation</p>
          <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-2xl leading-tight">
            Coconut oil led.<br />Saffron & sandalwood character.
          </h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              <div><h3 className="text-xl mb-2 text-amber-100">Coconut Oil</h3><p className="text-[#8a857a] leading-relaxed">The primary base. Clean, nourishing feel that leaves skin soft without heaviness.</p></div>
              <div><h3 className="text-xl mb-2 text-amber-100">Saffron Extract</h3><p className="text-[#8a857a] leading-relaxed">The signature. Gives the soap its distinctive identity and the line “Glow Like Gold”.</p></div>
              <div><h3 className="text-xl mb-2 text-amber-100">Sandalwood Oil</h3><p className="text-[#8a857a] leading-relaxed">Warm, grounding aroma that completes the sensory experience.</p></div>
            </div>
            <div className="space-y-8">
              <div><h3 className="text-xl mb-2 text-amber-100">Aloe Vera Extract</h3><p className="text-[#8a857a] leading-relaxed">Supports a calm, comfortable cleanse suitable for daily use.</p></div>
              <div><h3 className="text-xl mb-2 text-amber-100">Vitamin E</h3><p className="text-[#8a857a] leading-relaxed">A classic supporting ingredient for everyday skincare bars.</p></div>
              <div><h3 className="text-xl mb-2 text-amber-100">Castor Oil</h3><p className="text-[#8a857a] leading-relaxed">Helps create a rich, creamy lather while remaining gentle.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0e0e10]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-4">The Bar</p>
          <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">Translucent.<br />Glass-like.<br />Unmistakable.</h2>
          <p className="text-[#8a857a] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Each bar is a deep reddish-amber glass. Hold it to the light and it glows warm gold. This is not a generic brown soap — it is a distinctive, modern cleansing object designed to feel special every single day.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#c4b8a8]">
            <span className="px-4 py-2 rounded-full border border-[#2a2a2e]">100g each</span>
            <span className="px-4 py-2 rounded-full border border-[#2a2a2e]">Unisex</span>
            <span className="px-4 py-2 rounded-full border border-[#2a2a2e]">Paraben Free</span>
            <span className="px-4 py-2 rounded-full border border-[#2a2a2e]">All Natural Bar Soap</span>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-4">The Ritual</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Simple. Daily. Intentional.</h2>
          <p className="text-[#c4b8a8] leading-relaxed mb-8">
            Wet the bar, work into a soft lather, and cleanse. Rinse well. Suitable for face and body. Designed for everyday use by men and women.
          </p>
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6 md:p-8">
            <p className="text-amber-100 mb-2 font-medium">Care</p>
            <p className="text-sm text-[#8a857a]">Keep the soap in a dry place, alone, and avoid unnecessary water between uses. This preserves the glass-like surface and keeps the bar fresh longer.</p>
          </div>
        </div>
      </section>

      <section id="order" className="py-24 md:py-32 px-6 md:px-12 bg-[#0e0e10]">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-4">Order</p>
            <h2 className="text-3xl md:text-4xl font-light mb-4">Glow Pure Duo</h2>
            <p className="text-[#8a857a]">Free shipping across India · Cash on Delivery available</p>
          </div>
          <CheckoutForm />
        </div>
      </section>

      <footer className="py-16 px-6 md:px-12 border-t border-[#1a1a1e]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <p className="tracking-[0.2em] text-sm mb-2">GLAM GEAR GLOBAL</p>
            <p className="text-[#8a857a] text-sm max-w-xs">Premium accessible luxury skincare.<br />Deep Enterprises · Yamunanagar, Haryana</p>
          </div>
          <div className="text-sm text-[#8a857a] space-y-2">
            <p><a href="mailto:contact@glamgearglobal.in" className="hover:text-amber-400 transition">contact@glamgearglobal.in</a></p>
            <p>Instagram & Facebook · Instant support</p>
            <p className="pt-4 text-xs">No returns on FMCG products. Orders can be cancelled before dispatch by contacting support.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 inset-x-0 p-4 z-50 md:hidden bg-gradient-to-t from-black via-black/95 to-transparent pt-8">
        <a href="#order" className="block w-full py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium text-center">
          Order Now · ₹293 / ₹499
        </a>
      </div>
    </main>
  );
}
