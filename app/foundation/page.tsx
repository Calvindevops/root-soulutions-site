import Link from "next/link";
import * as motion from "framer-motion/client";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { FoundationHero } from "@/components/foundation/FoundationHero";

const pillars = [
  {
    title: "WHOLE-FOOD SCHOOL LUNCHES",
    desc: "We reimagine school meals with scratch-made recipes, culturally rooted flavors, and whole ingredients — creating Headliner Lunches kids actually want to eat.",
  },
  {
    title: "WHOLE-LIFE EDUCATION",
    desc: "We teach children and families how to understand their bodies, cook with whole ingredients, and build lifelong habits of wellness through workshops and hands-on learning.",
  },
  {
    title: "COMMUNITY UPLIFT",
    desc: "We build lasting systems through local farm partnerships, cafeteria team training, and family-centered nutrition programs that honor culture, dignity, and lived experience.",
  },
];

const impactBadges = [
  "Healthier Children",
  "Empowered Families",
  "Stronger Communities",
  "Sustainable Food Systems",
  "Generational Change",
];

export default function FoundationPage() {
  return (
    <main className="w-full">
      <FoundationHero />

      {/* ── 2. Mission Statement ── */}
      <section id="story" className="bg-[#FFF8F0] py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="heading-section text-[#2D5A27] mb-8"
          >
            MORE THAN A NONPROFIT
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg leading-relaxed mb-10"
          >
            We transform communities through whole-food nourishment, culturally rooted school meals,
            and sustainable, whole-life support — rooting for every child and family to thrive from
            the inside out.
          </motion.p>
          <motion.blockquote
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="font-[family-name:var(--font-heading)] italic text-[#2D5A27] text-2xl md:text-3xl leading-snug border-l-4 border-[#e85c2a] pl-6 text-left"
          >
            &ldquo;I see you. I believe in you. I&apos;m rooting for you.&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ── 3. Marquee ── */}
      <ScrollingMarquee
        text="WHOLE FOOD • WHOLE INGREDIENTS • WHOLE LIFE • WHOLE COMMUNITY"
        bgColor="#e85c2a"
        textColor="white"
      />

      {/* ── 4. Three Pillars Overview ── */}
      <section id="investing" className="bg-[#6B3FA0] py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="heading-section text-white text-center mb-16"
          >
            WHAT WE DO
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-[#FFF8F0] rounded-[2rem] p-8"
              >
                <h3 className="heading-card text-[#6B3FA0] mb-4">{pillar.title}</h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Pillar 1 — Headliner Lunches ── */}
      <section id="building" className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-[900px] mx-auto md:grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mb-10 md:mb-0"
          >
            <h2 className="heading-section text-[#F5C542] mb-6">HEADLINER LUNCHES</h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg leading-relaxed">
              School meals should feel like home — not hospital food. We create exciting,
              delicious, whole-food lunches that connect children to culture while nourishing
              their bodies.
            </p>
          </motion.div>
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              "Whole ingredients — no fillers, no shortcuts",
              "Fresh, culturally rooted flavors",
              "Scratch-made recipes from real kitchens",
              "Flavor-forward spice blends rooted in heritage",
              "Meals where health meets culture and identity",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-3 font-[family-name:var(--font-dm-sans)] text-white/80 text-lg"
              >
                <span className="text-[#e85c2a] mt-1 flex-shrink-0">&#9670;</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── 6. Pillar 2 — Whole-Life Education ── */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="max-w-[900px] mx-auto md:grid md:grid-cols-2 gap-12 items-start">
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4 order-2 md:order-1"
          >
            {[
              "Understand their bodies and the food they eat",
              "Cook with whole ingredients at home",
              "Build lifelong habits of wellness",
              "Break generational cycles with knowledge, not shame",
              "Hands-on workshops, school gardens, and community meals",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-3 font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg"
              >
                <span className="text-[#2D5A27] mt-1 flex-shrink-0">&#9670;</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mb-10 md:mb-0 order-1 md:order-2"
          >
            <h2 className="heading-section text-[#2D5A27] mb-6">WHOLE LIFE EDUCATION</h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg leading-relaxed">
              Wellness is accessible when it&apos;s real. We teach children and families how to
              take ownership of their health — not through shame, but through knowledge,
              skill, and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 7. Marquee ── */}
      <ScrollingMarquee
        text="ROOTED IN PURPOSE • GROWING TOGETHER • NOURISH THE WHOLE CHILD"
        bgColor="#2D5A27"
        textColor="white"
      />

      {/* ── 8. Pillar 3 — Community Uplift ── */}
      <section id="advisory" className="bg-[#6B3FA0] py-20 px-6">
        <div className="max-w-[900px] mx-auto md:grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mb-10 md:mb-0"
          >
            <h2 className="heading-section text-white mb-6">ROOTED SUPPORT</h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg leading-relaxed mb-8">
              We build systems that last — ones that meet communities where they are and
              invest in what&apos;s already there.
            </p>
            <blockquote className="font-[family-name:var(--font-heading)] italic text-white/80 text-xl leading-snug border-l-4 border-[#e85c2a] pl-5">
              &ldquo;We don&apos;t &lsquo;fix&rsquo; communities — we water what&apos;s already there.&rdquo;
            </blockquote>
          </motion.div>
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              "Partnerships with local farms",
              "Training and support for cafeteria teams",
              "Family-centered nutrition programs",
              "Programs that honor culture, dignity, and lived experience",
              "Infrastructure that serves communities long-term",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-3 font-[family-name:var(--font-dm-sans)] text-white/80 text-lg"
              >
                <span className="text-[#F5C542] mt-1 flex-shrink-0">&#9670;</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── 9. Our Impact — Badge Row ── */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="heading-section text-[#2D5A27] mb-10"
          >
            OUR IMPACT
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {impactBadges.map((badge, idx) => (
              <motion.span
                key={idx}
                variants={fadeInUp}
                className="bg-[#2D5A27] text-white rounded-full px-6 py-3 font-[family-name:var(--font-dm-sans)] font-bold uppercase text-sm tracking-wider"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/60 text-lg mt-10 max-w-[600px] mx-auto"
          >
            This is how you change the world — one meal, one child, one community at a time.
          </motion.p>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section className="bg-[#1A1A1A] py-24 px-6 text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="heading-section text-[#F5C542]">GET INVOLVED</h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg mt-4 max-w-[500px] mx-auto">
            Partner with us, support our mission, or bring Rooting For You to your school.
          </p>
          <Link
            href="/contact"
            className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block mt-8 hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
          >
            REACH OUT TO US
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
