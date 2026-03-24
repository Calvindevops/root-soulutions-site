// Framer Motion variants for Root Soulutions

// Fade in up — most content sections, headings, cards
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 },
};

// Simple fade in
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

// Stagger children container
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true },
};

// Float/bob effect — hero product image
export const float = {
  animate: { y: [-5, 5] },
  transition: {
    repeat: Infinity,
    repeatType: "reverse" as const,
    duration: 3,
    ease: "easeInOut",
  },
};

// Card hover lift — product cards
export const cardHover = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  transition: { duration: 0.3 },
};

// Slide in from left — founder photo
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
};

// Slide in from right — bundle CTA image
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
};

// Scale in — logos, badges
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { once: true },
};

// Spring presets for natural motion
export const springFast = { type: "spring" as const, stiffness: 400, damping: 25 };
export const springMedium = { type: "spring" as const, stiffness: 300, damping: 20 };
export const springBounce = { type: "spring" as const, stiffness: 500, damping: 15 };

// Button press feedback
export const buttonPress = {
  whileTap: { scale: 0.95 },
};

// Card hover with spring + tap
export const cardHoverSpring = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  whileTap: { scale: 0.98 },
};
