import Link from "next/link";
import { Leaf } from "@phosphor-icons/react/dist/ssr";

export function AnnouncementBar() {
  const messages = [
    <span key="1">
      <Link href="/shop" className="hover:underline">🎉 15% OFF YOUR FIRST ORDER — CODE <strong className="tracking-widest">SOUL15</strong></Link>
    </span>,
    <span key="2">FREE SHIPPING ON ORDERS $50+</span>,
    <span key="3">
      <Link href="/shop" className="hover:underline">WHOLE-FOOD SEASONINGS CRAFTED WITH SOUL</Link>
    </span>,
    <span key="4">LOW SODIUM. CHEMICAL-FREE. SMALL-BATCH.</span>,
    <span key="5">
      <Link href="/markets" className="hover:underline">FIND US AT YOUR LOCAL FARMERS MARKET</Link>
    </span>,
    <span key="6">CHEF CURATED AND FOUNDED</span>,
  ];

  return (
    <div className="sticky top-0 z-50 h-[34px] bg-[#1A1A1A] text-[#F5C542] uppercase font-bold text-sm overflow-hidden flex items-center">
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center whitespace-nowrap px-4">
            {messages.map((msg, j) => (
              <div key={j} className="flex items-center">
                {msg}
                <Leaf weight="regular" className="mx-4 text-[#F5C542]" size={16} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}