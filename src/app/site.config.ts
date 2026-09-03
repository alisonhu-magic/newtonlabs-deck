import { asset } from "@/lib/asset";

export const siteConfig = {
  nav: {
    logo: asset("/assets/brand/logos/svg/Newton-Symbol-Coal.svg"),
    wordmark: asset("/assets/brand/logos/svg/NewtonLabs-Wordmark-Coal.svg"),
    logoLabel: "Newton Labs",
  },
  backedBy: {
    heading: "Backed by",
    logos: [
      { src: asset("/assets/backers/paypal-ventures.svg"), name: "PayPal Ventures", h: 20 },
      { src: asset("/assets/backers/dcg.svg"), name: "DCG", h: 26 },
      { src: asset("/assets/backers/coinfund.svg"), name: "CoinFund", h: 22 },
      { src: asset("/assets/backers/volt-capital.svg"), name: "Volt Capital", h: 20 },
      { src: asset("/assets/backers/placeholder.svg"), name: "Placeholder", h: 20 },
      { src: asset("/assets/backers/lightspeed.svg"), name: "Lightspeed", h: 20 },
      { src: asset("/assets/backers/sv-angel.svg"), name: "SV Angel", h: 30 },
      { src: asset("/assets/backers/cherubic.svg"), name: "Cherubic", h: 30 },
      { src: asset("/assets/backers/tiger-global.svg"), name: "Tiger Global", h: 16 },
      { src: asset("/assets/backers/social-capital.svg"), name: "Social Capital", h: 16 },
      { src: asset("/assets/backers/synchrony.svg"), name: "Synchrony", h: 22 },
      { src: asset("/assets/backers/polygon.svg"), name: "Polygon", h: 24 },
    ],
  },
} as const;
