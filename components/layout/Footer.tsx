import Link from "next/link";
import Image from "next/image";
import { InstagramLogo, TiktokLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F5C542]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          {/* Col 1 */}
          <div>
            <Image
              src="/brand/rs-logo-text.png"
              alt="Root Soulutions"
              width={200}
              height={42}
              className="h-[38px] w-auto mb-2"
            />
            <p className="font-[family-name:var(--font-dm-sans)] text-sm mb-6 max-w-[250px]">
              Whole-food, low-sodium seasonings crafted with SOUL.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/loverootsoulutions" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80 transition flex items-center justify-center min-w-[44px] min-h-[44px]">
                <InstagramLogo size={28} weight="fill" />
              </a>
              <a href="#" aria-label="TikTok" className="hover:opacity-80 transition flex items-center justify-center min-w-[44px] min-h-[44px]">
                <TiktokLogo size={28} weight="fill" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80 transition flex items-center justify-center min-w-[44px] min-h-[44px]">
                <FacebookLogo size={28} weight="fill" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] uppercase text-lg mb-4">SHOP</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/shop" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Shop All</Link></li>
              <li><Link href="/products/simple-szn" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Simple SZN</Link></li>
              <li><Link href="/products/smokey-cajun-szn" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Smokey Cajun SZN</Link></li>
              <li><Link href="/products/garlicky-szn" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Garlicky SZN</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] uppercase text-lg mb-4">COMPANY</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Our Story</Link></li>
              <li><Link href="/markets" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Farmers Markets</Link></li>
              <li><Link href="/wholesale" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Wholesale</Link></li>
              <li><Link href="/recipes" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Recipes</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] uppercase text-lg mb-4">SUPPORT</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Contact</Link></li>
              <li><Link href="/faq" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">FAQ</Link></li>
              <li><Link href="/shipping" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Terms</Link></li>
              <li><Link href="/privacy" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#F5C542]/70 hover:text-[#F5C542] transition">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Parent Brand */}
        <div className="border-t border-white/10 pt-6 mt-8 flex items-center justify-center gap-3">
          <Image
            src="/brand/craft-eatery-logo.png"
            alt="Craft Eatery"
            width={40}
            height={34}
            className="opacity-70"
          />
          <span className="text-[#F5C542]/50 text-xs font-[family-name:var(--font-dm-sans)] uppercase tracking-wider">
            A Craft Eatery Brand
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F5C542]/50 font-[family-name:var(--font-dm-sans)]">
          <p>&copy; 2026 Root Soulutions. Craft Eatery Food Genius Company L.L.C.</p>
          <div className="flex items-center gap-4">
            <p>Visa &bull; Mastercard &bull; Amex &bull; Apple Pay</p>
            <Link href="/admin/login" aria-label="Admin">
              <Image src="/brand/beetroot-small.png" alt="" width={18} height={18} className="opacity-30 hover:opacity-70 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}