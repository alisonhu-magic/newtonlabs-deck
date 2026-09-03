/**
 * Fund-admin deck copy (NEWT-2517). Partner-facing commercial terms stay here
 * so they don't mix into shared marketing config.
 */

export const deckMeta = {
  title: "Newton Labs — Policy Infrastructure for Onchain Finance",
  preparedFor: "September 2026",
  brand: "Newton Labs",
} as const;

export const titleSlide = {
  headline: "Policy Infrastructure for Onchain Finance",
  subheadline:
    "Vault administration and tokenization, with enforcement you can prove.",
  lede: "September 2026",
} as const;

export const shiftSlide = {
  label: "The Shift",
  headline: "Capital is moving onchain, and vaults are the vehicle.",
  body: "Real world assets are the fastest growing asset type inside onchain vaults. BlackRock and Kraken already deploy through this infrastructure.",
  stats: [
    {
      value: "$33.9B",
      label: "Tokenized real world assets onchain.",
      source: "DefiLlama, September 2026.",
    },
    {
      value: "2.4x",
      label: "Growth since January 2026, when the figure was roughly $14.1B.",
    },
    {
      value: "217",
      label: "Asset issuers now live onchain, from BlackRock down to single funds.",
    },
  ],
  closer: "The structures fund administrators manage are being rebuilt as contracts.",
} as const;

export const vaultSlide = {
  label: "What a Vault Is",
  headline: "A fund, expressed as a contract.",
  columns: { left: "Traditional fund", right: "Onchain vault" },
  rows: [
    { left: "Manager", right: "Curator" },
    { left: "Subscriptions", right: "Deposits" },
    { left: "Dealing cycle", right: "Redemption queue" },
    { left: "Net asset value", right: "Share price" },
    { left: "Offering documents", right: "Mandate, set in policy" },
  ],
  automated: {
    title: "Already automated by the contract",
    items: [
      "Net asset value calculation.",
      "Investor register.",
      "Subscriptions and redemptions.",
      "Fee calculation and accrual.",
    ],
    footer: "No administrator performs these for a vault. The contract does.",
  },
  closer: "Half of fund administration is automated. The other half is still manual.",
} as const;

export const gapSlide = {
  label: "The Gap",
  headline: "The compliance work is still done by hand.",
  body: "Every function a fund needs beyond accounting. Curators perform these manually, or skip them.",
  cards: [
    {
      iconUrl: "/assets/icons/bank.svg",
      title: "Legal wrapper and domicile",
      description: "Most vaults have no entity behind them at all.",
    },
    {
      iconUrl: "/assets/icons/identity.svg",
      title: "Investor onboarding",
      description: "Screening performed once, then assumed to hold.",
    },
    {
      iconUrl: "/assets/icons/note-pencil.svg",
      title: "Tax and regulatory reporting",
      description: "No standard output for investors or regulators.",
    },
    {
      iconUrl: "/assets/icons/verify.svg",
      title: "Audit support",
      description: "No reconciled record built for an auditor to test.",
    },
    {
      iconUrl: "/assets/icons/handshake.svg",
      title: "Allocator diligence",
      description: "Answered case by case, in email and spreadsheets.",
    },
    {
      iconUrl: "/assets/icons/seal-check.svg",
      title: "Evidence the mandate held",
      description: "Asserted by the curator. Verified by no one.",
    },
  ],
  closer: "Allocators cannot diligence what they cannot verify.",
} as const;

export const whatNewtonSlide = {
  label: "What Newton Is",
  headline: "Rules enforced before settlement. Provable at any moment.",
  body: "Newton is the authorization layer for onchain transactions. Rules are defined once and enforced wherever assets move.",
  cards: [
    {
      title: "Controls expressed as rules",
      description:
        "Written in Rego, referencing whatever data decides them: sanctions lists, identity checks, credit ratings, NAV, signing state.",
      image: {
        src: "/assets/what-newton/controls.png",
        alt: "Rego policy code alongside a transaction intent in the Newton editor.",
      },
    },
    {
      title: "An independent network enforces them",
      description:
        "Evaluated by Newton's operator network rather than by the curator or the platform, before the transaction settles.",
      image: {
        src: "/assets/what-newton/network.webp",
        alt: "Network diagram: a curator's intent flows through Newton operators and Shield validation before the vault executes onchain actions.",
      },
    },
    {
      title: "Every evaluation is attested onchain",
      description:
        "Each evaluation produces an onchain attestation, and each rule version is a permanent artifact.",
      image: {
        src: "/assets/what-newton/attestation.png",
        alt: "Newton protecting a smart contract from a hallucinated agent, unauthorized transaction, and sanctioned wallet.",
      },
    },
  ],
} as const;

export const acrossBookSlide = {
  label: "Across the Book",
  headline: "One verification layer, several asset lines.",
  items: [
    {
      title: "DeFi vaults",
      description:
        "Programmable risk and compliance for curators, allocators, and platforms.",
      image: "/assets/usecases/defi.png",
    },
    {
      title: "Real world assets",
      description:
        "Investor eligibility, jurisdictional limits, and transfer rules enforced at the token.",
      image: "/assets/usecases/rwas.png",
    },
    {
      title: "Trusts and fiduciary structures",
      description:
        "Deed conditions, consent requirements, and distribution rules enforced and recorded.",
      image: "/assets/goal/goal.png",
    },
    {
      title: "Treasury and wallet management",
      description:
        "Spend limits, counterparty restrictions, and approval workflows for institutional wallets.",
      image: "/assets/usecases/ai.png",
      crop: { w: "110.25%", h: "110.35%", left: "-6.61%", top: "-10.38%" },
    },
  ],
  closer: "The controls recur across lines. One rule library, recombined by line.",
} as const;

export const whyNowSlide = {
  label: "Why Now",
  headline: "The market is moving without traditional managers.",
  cards: [
    {
      iconUrl: "/assets/icons/users-three.svg",
      title: "A new class of manager took the position",
      description:
        "Crypto-native curators are running strategies and earning the fees that traditional managers will not yet underwrite. They are winning allocations without a fund wrapper, an administrator, or an audit, and the capital following them is increasingly institutional.",
    },
    {
      iconUrl: "/assets/icons/package.svg",
      title: "The service stack is consolidating",
      description:
        "Securitize now holds tokenization, transfer agency, a broker-dealer, an ATS, and the largest digital asset fund administrator: $38B across 715 funds, in one company. Assembled by acquisition, in under two years.",
    },
  ],
  closer:
    "Both of these happened without traditional administrators.",
} as const;

export const whereNextSlide = {
  label: "Where We Go From Here",
  headline: "Two ways to work together.",
  body: "Two places Newton fits, built on the same policy layer.",
  cards: [
    {
      eyebrow: "Opportunity One",
      title: "Vault administration as a service",
      description:
        "A new line of business. A fund administrator administers onchain vaults the way it administers funds, with Newton enforcing the mandate and producing the record.",
    },
    {
      eyebrow: "Opportunity Two",
      title: "Tokenization extensions",
      description:
        "An upgrade to what a fund administrator already sells to issuers. Eligibility becomes verifiable, and fund mechanics become enforced rather than administered by hand.",
    },
  ],
  closer:
    "The first is a new revenue line. The second makes an existing one harder to compete with.",
} as const;

export const vaultAdminSlide = {
  label: "Opportunity One · Vault Administration",
  headline: "Fund administration has no vault equivalent.",
  body: "Vault contracts handled the accounting, and early depositors never asked for the rest. The allocators curators want next ask as a matter of course.",
  cards: [
    {
      iconUrl: "/assets/icons/go-to-market.svg",
      title: "Crypto-native curators",
      description:
        "Running real strategies and seeking institutional capital. No entity, no administrator, no diligence answer. This is what caps their growth.",
    },
    {
      iconUrl: "/assets/icons/bank.svg",
      title: "Traditional managers moving onchain",
      description:
        "Already have a fund, an administrator, and investors who expect the full apparatus. Moving onchain, their provider cannot follow them.",
    },
  ],
  partnership: {
    title: "The partnership",
    description:
      "A fund administrator brings the licenses, the domiciles, the operations, and the client relationships. Newton brings enforcement before settlement and an attestation record.",
  },
  closer: "Neither side can offer this alone.",
} as const;

export const clientBuysSlide = {
  label: "Opportunity One · Vault Administration",
  headline: "What the client buys.",
  body: "One engagement, one fee schedule, two providers behind it.",
  columns: [
    {
      title: "At launch",
      items: [
        "Structure, entity, and domicile",
        "Mandate definition, as documents and as policy",
        "Wallet and signer configuration",
        "Investor onboarding and screening",
      ],
    },
    {
      title: "Ongoing",
      items: [
        "NAV, register, subscriptions and redemptions",
        "Screening, tax and regulatory filings",
        "Policy enforced on every vault operation",
        "Attestation record and LP dashboard",
      ],
    },
  ],
  image: {
    src: "/assets/workflow/step-4-light.webp",
    alt: "Newton explorer — Verified Curator Actions history with per-action evaluation results (approved, denied)",
    caption: "The LP dashboard: every enforcement decision, as operations settle.",
  },
  closer: "Mandate definition is the new line item. Everything else a fund administrator already does.",
} as const;

export const tokenLimitsSlide = {
  label: "Opportunity Two · Tokenization",
  headline: "Every token rule governs who may hold the share.",
  body: "Identity registry, whitelist, jurisdictional restrictions, lockups, holder caps, forced transfer. The most advanced stacks in the market stop at the same line.",
  cards: [
    {
      iconUrl: "/assets/icons/identity.svg",
      title: "Attributes go stale",
      description:
        "Accreditation lapses. Sanctions lists change. Control of a wallet changes. A whitelist is a snapshot that everyone treats as current.",
    },
    {
      iconUrl: "/assets/icons/chart-line-up.svg",
      title: "Nothing reads fund state",
      description:
        "Redemption gates, liquidity coverage, stale NAV, side pockets, 3(c)(1) holder counts, the ERISA 25% test. Computed conditions a whitelist cannot express.",
    },
    {
      iconUrl: "/assets/icons/limits.svg",
      title: "Nothing governs the asset side",
      description:
        "The share is controlled. What the manager does with the money once raised is governed by a document and nothing else.",
    },
  ],
  closer:
    "A token can say who may hold it. It cannot say what may be done with the money.",
} as const;

export const tokenAddsSlide = {
  label: "Opportunity Two · Tokenization",
  headline: "What Newton adds to a tokenized fund.",
  body: "Three additions, answering the three limits, using data the fund administrator already holds.",
  cards: [
    {
      iconUrl: "/assets/icons/shield-check.svg",
      title: "Eligibility that stays true",
      description:
        "The fund administrator's screening runs at evaluation rather than at onboarding, and the result is verifiable by an LP or auditor. The underlying data never leaves the fund administrator.",
    },
    {
      iconUrl: "/assets/icons/enforcement.svg",
      title: "Fund mechanics enforced",
      description:
        "Gates, liquidity coverage, stale NAV, holder counts and plan asset tests become conditions on the transaction rather than a monthly manual check.",
    },
    {
      iconUrl: "/assets/icons/scroll.svg",
      title: "The mandate in the path",
      description:
        "Investment restrictions written as policy, evaluated before settlement, with a record the manager cannot revise after the fact.",
    },
  ],
  closer:
    "The fund administrator already computes all of this. Newton makes it enforceable and checkable.",
} as const;

export const togetherSlide = {
  label: "Together",
  headline: "The fund administrator determines the truth.",
  body: "Newton makes it enforceable and provable.",
  columns: { left: "Fund Administrator", right: "Newton" },
  rows: [
    {
      left: "Screening, and the data behind it",
      right: "That screening result, independently verifiable",
    },
    {
      left: "NAV, register, and reporting",
      right: "Fund mechanics enforced, not administered",
    },
    {
      left: "Licensed fiduciary judgment",
      right: "The mandate as a condition of the transaction",
    },
    {
      left: "The client relationship",
      right: "A record no party to it can revise",
    },
  ],
  closer:
    "An administrator sells independence. Newton is how it reaches onchain assets.",
} as const;

export const whoBuildsSlide = {
  label: "Who Builds Newton",
  headline:
    "We solved onboarding for 56M accounts. Now we solve authorization.",
  body: "Newton Labs, formerly Magic Labs. Our wallet infrastructure served 56M+ accounts across consumer and institutional applications, including Polymarket, before Payward, Kraken's parent company, acquired the wallet business.",
  stat: { value: "$80M+", label: "Raised from top backers" },
  badges: ["SOC 2 Type II", "ISO 27001"],
} as const;

export const thanksSlide = {
  headline: "Thank you.",
  lede: "Newton Labs",
  links: [
    { label: "newton.xyz", href: "https://newton.xyz" },
    { label: "docs.newton.xyz", href: "https://docs.newton.xyz" },
    { label: "@newton_xyz", href: "https://x.com/newton_xyz" },
  ],
} as const;

export const architectureSlide = {
  label: "Appendix · Architecture",
  headline: "Under the hood: the verification network.",
  lede: "Every evaluation is executed by a decentralized operator network, cryptographically signed, and verified onchain before the vault operation settles.",
  steps: [
    {
      number: "1",
      title: "Intent submitted",
      description:
        "A transaction hitting the vault contract is packaged as an intent and broadcast to Newton's operator network.",
    },
    {
      number: "2",
      title: "Operators evaluate and sign",
      description:
        "Operators pull the offchain data the rules require, run the logic, and sign. At quorum, signatures aggregate into one BLS attestation.",
    },
    {
      number: "3",
      title: "Enforcement, onchain",
      description:
        "The attestation goes to the contract, which verifies it and approves or rejects. No single operator can be compromised or coerced.",
    },
  ],
  image: {
    src: "/assets/workflow/step-3-light.png",
    alt: "Protection and compliance flow — core entities and policy evaluation across the Newton operator network",
  },
} as const;

export const integrationSlide = {
  label: "Appendix · Integration",
  headline: "Three integration paths.",
  featured: {
    title: "Newton Shield, in front of the curator’s wallet.",
    description:
      "Deploy Shield and delegate curator control to it. Every instruction is evaluated before it reaches the vault. No change to the vault contract, no redeployment, no new audit. The path for vaults already live.",
    image: {
      src: "/assets/workflow/step-2-light.webp",
      alt: "Newton demo vault — Policy view showing smart-contract-enforced policy rules with categories and controls",
    },
  },
  items: [
    {
      title: "In the vault contract.",
      description:
        "A lightweight client in the vault itself. Works with Veda’s Hook module, Morpho’s Gate contracts, Lagoon’s Whitelist Manager, and any ERC-4626 vault.",
    },
    {
      title: "At deployment.",
      description:
        "New vaults launch through Newton’s vault launchpad with Shield integrated from the start. At launch, works with Veda, Morpho, and Aave.",
    },
  ],
  footnote: "Evaluation completes in under two seconds on each path.",
  closer: "A policy stack in force, with each rule and its evaluation record.",
} as const;
