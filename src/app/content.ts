/**
 * Newton × Aon deck copy. Kept next to the route (not site.config) so
 * partner-facing commercial terms don't mix into public marketing config.
 * Source: Newton_x_Aon_Verifiable_Risk_Controls (NEWT-2470).
 */

export const deckMeta = {
  title: "Newton × Aon — Verifiable Risk Controls",
  preparedFor: "Prepared for Aon · 2026",
  brand: "Newton Labs",
} as const;

export const titleSlide = {
  headline: "Proof of Controls",
  subheadline: "Verifiable risk controls for scaling DeFi insurance.",
  lede: "Prepared for Aon · 2026",
} as const;

export const goalSlide = {
  label: "The Goal",
  headline: "Vault coverage scales when carriers can trust the controls.",
  body: "Verified controls let rates fall. Falling rates let coverage scale: more vaults covered, larger limits, more carriers writing. Premium dollars grow with all of it.",
  stats: [
    { value: "~5%", label: "Today" },
    { value: "~3.5–4%", label: "Strong controls, self-enforced" },
    { value: "2%", label: "Target rate with independent verification" },
  ],
  footnote: "Independent verification is the path to 2%.",
  image: {
    src: "/assets/goal/goal.png",
    alt: "Onlookers gathered outside a large institutional facility.",
  },
} as const;

export const problemSlide = {
  label: "The Problem",
  headline: "High premiums must price in two kinds of uncertainty.",
  cards: [
    {
      iconUrl: "/assets/icons/composable.svg",
      title: "No shared standard",
      description:
        "Every vault defines controls its own way, so every review starts from scratch.",
    },
    {
      iconUrl: "/assets/icons/verify.svg",
      title: "No independent verification",
      description:
        "Underwriting review at binding, investigation at claim. Between the two, compliance is self-asserted.",
    },
  ],
  callout:
    "Twenty controls verified at binding. One lapses for a week; a loss occurs during the lapse; the control is restored; the claim is filed. No one can prove the state of the controls at the time of loss, so carriers price that scenario into every policy.",
  closer: "The consortium writes the standard. Newton makes it verifiable.",
} as const;

export const whatNewtonSlide = {
  label: "What Newton Is",
  headline:
    "Risk controls, enforced before settlement. Provable at any moment.",
  cards: [
    {
      title: "Controls expressed as rules",
      description:
        "Written in Rego, referencing the data that decides them: audit registries, oracle configurations, price feed sources, sanctions lists, signing state. Onchain or offchain.",
      image: {
        src: "/assets/what-newton/controls.png",
        alt: "Rego policy code alongside a transaction intent in the Newton editor.",
      },
    },
    {
      title: "An independent network enforces them",
      description:
        "Rules are evaluated by Newton's operator network rather than the curator or platform. Evaluation completes before the transaction settles; transactions proceed only if the checks pass.",
      image: {
        src: "/assets/what-newton/network.webp",
        alt: "Network diagram: a curator's intent flows through Newton operators and Shield validation before the vault executes onchain actions.",
      },
    },
    {
      title: "Every evaluation is attested onchain",
      description:
        "Each evaluation produces an onchain attestation, and every rule version is a permanent onchain artifact. What was enforced, what was checked, and what changed is public record.",
      image: {
        src: "/assets/what-newton/attestation.png",
        alt: "Newton protecting a smart contract from a hallucinated agent, unauthorized transaction, and sanctioned wallet.",
      },
    },
  ],
} as const;

export const underwritingSlide = {
  label: "For Underwriting",
  headline: "Control requirements become verified conditions.",
  columns: { today: "Today", newton: "With Newton" },
  rows: [
    {
      today: "Controls verified once, at binding",
      newton: "Controls verifiably enforced at every vault operation",
    },
    {
      today: "Compliance self-asserted for the term",
      newton: "Compliance attested onchain, continuously",
    },
    {
      today: "Breach discovered in claims investigation",
      newton: "Breach blocked before settlement, or visible the moment it occurs",
    },
    {
      today: "State at time of loss reconstructed after the fact",
      newton: "State at time of loss is an onchain lookup",
    },
    {
      today: "Control changes surface at the next review (if ever)",
      newton: "Control changes are themselves onchain events",
    },
    {
      today: "No independent enforcement record",
      newton:
        "Every month of verified controls accumulates into enforcement and loss history",
    },
  ],
  footnote:
    "At claim time, no one has to reconstruct what was true; the record is there. And the record compounds into the dataset actuaries can eventually rate against: pricing by demonstrated enforcement rather than by category.",
} as const;

export const consortiumSlide = {
  label: "The Consortium",
  headline:
    "The consortium writes the rules. Newton proves the rules were in place.",
  cards: [
    {
      iconUrl: "/assets/icons/scroll.svg",
      title: "Written standard",
      description:
        "The consortium publishes its control framework: the criteria a coverable vault must meet.",
    },
    {
      iconUrl: "/assets/icons/shield-check.svg",
      title: "Enforceable pack",
      description:
        "Each control is written as an enforceable rule. The rules compose into a versioned onchain pack. Updates propagate to adopting vaults; version history is public.",
    },
    {
      iconUrl: "/assets/icons/seal-check.svg",
      title: "Verified adoption",
      description:
        "A carrier quoting a vault checks one thing: the pack is in force and enforced. Attestations show it continuously, for the life of the policy.",
    },
  ],
  closer: "One pack, adopted across vaults, verifiable by any carrier.",
} as const;

export const controlsSlide = {
  label: "Risk Control Examples",
  headline: "Carrier requirements: from checklist to code.",
  cards: [
    {
      iconUrl: "/assets/icons/security.svg",
      title: "Audits current",
      description: "Checks audit status against the registry at each operation.",
      badge: "Verified",
    },
    {
      iconUrl: "/assets/icons/verify.svg",
      title: "Contract unchanged",
      description:
        "Flags material change to vault code or configuration the moment it occurs.",
      badge: "Verified",
    },
    {
      iconUrl: "/assets/icons/chain-agnostic.svg",
      title: "Oracle standards",
      description:
        "Requires approved providers, configurations, and minimum feed source counts.",
      badge: "Enforced",
    },
    {
      iconUrl: "/assets/icons/limits.svg",
      title: "Allocation scope",
      description:
        "Re-checks any new market against the underwritten scope before funds move.",
      badge: "Enforced",
    },
    {
      iconUrl: "/assets/icons/identity.svg",
      title: "Signing quorum",
      description:
        "Confirms the required MPC quorum approved each transaction.",
      badge: "Enforced",
    },
    {
      iconUrl: "/assets/icons/sanctions.svg",
      title: "Sanctions screening",
      description: "Screens counterparties against sanctions data at evaluation.",
      badge: "Enforced",
    },
  ],
  footnote:
    "Enforced: a failed check blocks settlement. Verified: state attested onchain, visible immediately.\nAny control referencing observable data can be written as a rule. When the consortium publishes its framework, the framework becomes the pack.",
  closer:
    "Rules reference data through the curator's own provider subscriptions. Newton adds no markup and holds no data.",
} as const;

export const carrierSlide = {
  label: "What the Carrier Sees",
  headline: "A live window on every covered vault.",
  points: [
    {
      title: "The transparency dashboard.",
      description:
        "Controls in force and every enforcement decision as vault operations settle. Per vault, shared with the carrier on the risk for the life of the policy. Compliance is visible; positions and strategy are not.",
    },
    {
      title: "The same view depositors see.",
      description:
        "Nothing prepared for the carrier, nothing withheld from the market. The record that satisfies the carrier also markets the vault to allocators.",
    },
    {
      title: "Provisioned through Aon.",
      description:
        "Access for Aon teams, clients, and the carrier on each risk. Everything on it is backed by public onchain attestations. Nothing to integrate.",
    },
  ],
  image: {
    src: "/assets/workflow/step-4-light.webp",
    alt: "Newton explorer — Verified Curator Actions history with per-action evaluation results (approved, denied)",
  },
  caption: "Evaluation record — every decision attested onchain.",
} as const;

export const workingModelSlide = {
  label: "The Working Model",
  headline: "Four roles, one product.",
  cards: [
    {
      iconUrl: "/assets/icons/bank.svg",
      title: "The consortium",
      description:
        "Defines the control framework: what a coverable vault meets.",
    },
    {
      iconUrl: "/assets/brand/logos/svg/Newton-Symbol-Coal.svg",
      title: "Newton",
      description:
        "Turns the framework into enforceable rules, enforces them before settlement, attests every evaluation onchain.",
    },
    {
      iconUrl: "/assets/brand/logos/webp/aon-wordmark.webp",
      title: "Aon",
      description:
        "Brings the framework to clients and carriers as an Aon-branded offering, powered (and verified) by Newton.",
    },
    {
      iconUrl: "/assets/icons/users-three.svg",
      title: "STG",
      description:
        "Operationalizes: documentation, carrier strategy, the path from framework to bound policies.",
    },
  ],
  closer:
    "A natural extension: Aon or a trusted consortium member operates a node in the verification network itself.",
} as const;

export const acrossBookSlide = {
  label: "Across the Book",
  headline: "A verification layer for every digital asset line.",
  featured: {
    title: "DeFi vaults",
    description:
      "The consortium product: this deck. Wallet controls included: signing quorum and key configuration verified per transaction.",
    image: "/assets/usecases/defi.png",
    policies: ["Signing quorum", "Allocation scope", "Oracle standards"],
  },
  items: [
    {
      title: "Treasury & wallet management",
      description:
        "Spend limits, counterparty restrictions, and approval workflows for institutional wallets.",
      image: "/assets/usecases/ai.png",
      crop: { w: "110.25%", h: "110.35%", left: "-6.61%", top: "-10.38%" },
      policies: ["Spend limits", "Approved payees", "Signing quorum"],
    },
    {
      title: "Real world assets",
      description:
        "Investor eligibility, jurisdictional and transfer restrictions, enforced at the token level.",
      image: "/assets/usecases/rwas.png",
      policies: ["Eligibility", "Jurisdiction", "Transfer restrictions"],
    },
    {
      title: "Stablecoins & protocols",
      description: "Issuance and redemption controls.",
      image: "/assets/usecases/stablecoins.png",
      policies: ["Issuance", "Redemption", "Sanctions screening"],
    },
  ],
  closer:
    "The controls recur across lines: screening, quorum, scope. One rule library, recombined by line, verified the same way.",
} as const;

export const whoBuildsSlide = {
  label: "Who Builds Newton",
  headline:
    "We solved onboarding for 56M accounts. Now we solve authorization.",
  body: "Newton Labs, formerly Magic Labs. Our wallet infrastructure served 56M+ accounts across consumer and institutional applications, including Polymarket, before Payward, Kraken's parent company, acquired the wallet business.",
  bodyClose: "Newton is the authorization layer for onchain finance.",
  stat: { value: "$80M+", label: "Raised from top backers" },
  badges: ["SOC 2 Type II", "ISO 27001"],
} as const;

export const commercialSlide = {
  label: "Commercial Structure",
  headline: "Aligned by construction.",
  principle:
    "Principle: Aon nets more on a Newton-verified placement than on any placement without one.",
  pillars: [
    {
      iconUrl: "/assets/icons/briefcase.svg",
      title: "Program",
      description:
        "Aon holds the program: $200K annually, creditable in full against share revenue. Covers the consortium pack, provisioning for Aon teams, clients, and carriers, and enablement through STG.",
    },
    {
      iconUrl: "/assets/icons/chart-pie-slice.svg",
      title: "Share",
      description:
        "Newton earns a share of placement economics that steps with verification intensity (ie, curator activity): 17.5% passive, 20% active, 22.5% high-frequency strategies. Set at binding, re-rated at renewal. Aon keeps the rest.",
    },
    {
      iconUrl: "/assets/icons/chart-line-up.svg",
      title: "Upside",
      description:
        "Carriers pay profit commissions when a book outperforms its pricing. If the verified book runs cleaner, Newton participates in that outperformance alongside Aon. Upside that exists only if verification works.",
    },
  ],
  table: {
    caption: "The curator’s view",
    headers: ["", "Standards, self-enforced", "Verified"],
    rows: [
      { label: "Rate", self: "~3.5–4%", verified: "2%" },
      {
        label: "Annual premium, $25M limit",
        self: "~$875K–1M",
        verified: "$500K",
      },
      { label: "Verification cost to curator", self: "—", verified: "$0" },
    ],
  },
  curatorNotes: [
    "Curators never see a verification line. Verified placement is simply the better rate, through Aon.",
    "A service, not monitoring: the same dashboard markets the vault to allocators, and curators extend the pack with their own rules within the framework.",
    "Data stays direct: the curator’s existing provider subscriptions power the rules. Newton adds no markup and holds no data.",
  ],
  footnote: "A starting structure to be shaped with STG.",
} as const;

export const pathSlide = {
  label: "The Path",
  headline: "From framework to first bound policy.",
  steps: [
    {
      number: "1",
      title: "Now",
      description:
        "Map the consortium’s draft framework to an enforceable pack, in step with the September publication.",
      iconUrl: "/assets/icons/note-pencil.svg",
    },
    {
      number: "2",
      title: "September",
      description:
        "STG working session: product access, commercial structure, carrier materials.",
      iconUrl: "/assets/icons/handshake.svg",
    },
    {
      number: "3",
      title: "New York event",
      description:
        "The consortium event. Verification live in front of the carriers in the room.",
      iconUrl: "/assets/icons/broadcast.svg",
    },
    {
      number: "4",
      title: "The pilot",
      description:
        "One live vault, quoted three ways: baseline, standards self-enforced, standards verified. The deltas are the proof.",
      iconUrl: "/assets/icons/flask.svg",
    },
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
        "When a transaction hits the vault contract, it is packaged as an intent and broadcast to Newton’s operator network — the same network securing every evaluation across every Newton-integrated contract.",
    },
    {
      number: "2",
      title: "Operators evaluate and sign",
      description:
        "Operators pull the offchain data the rules require — sanctions lists, identity checks, oracle health — run the rule logic, and sign the result. Once quorum is reached, signatures aggregate into a single BLS attestation.",
    },
    {
      number: "3",
      title: "Enforcement, onchain",
      description:
        "The attestation is submitted to the contract, which verifies it and approves or rejects the transaction. No single operator can be compromised or coerced. Newton is privacy-preserving, using a combination of TEE, MPC, and ZK tech, to protect any sensitive data.",
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
      "Deploy Shield and delegate curator control to it. Every instruction is evaluated before it reaches the vault, so nothing settles unless it passes. Wallet controls like signer quorum become independently verifiable, and rules the wallet cannot express are added in the same step. No change to the vault contract, no redeployment, no new audit — the best path for vaults that are already live.",
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
        "New vaults launch through Newton’s vault launchpad with Shield integrated from the start. At launch, works with Veda, Morpho, and Aave, with more support to come.",
    },
  ],
  footnote: "Evaluation completes in under two seconds on each path.",
  closer: "The contract path: a single require() statement.",
} as const;
