/**
 * Curator sales one-sheet (NEWT-2469). Copy is verbatim from Jeff’s
 * Google Doc; layout is A4, card + icon, no diagrams.
 */

export const sheetMeta = {
  title: "Policies You Can Prove",
  subtitle: "Newton for curators — A4 sales one-sheet.",
  ticket: "NEWT-2469",
  href: "/sheet",
  downloads: {
    full: "/downloads/curators.pdf",
  },
} as const;

export const prove = {
  label: "Newton for Curators",
  headline: "Policies You Can Prove",
  body: "Today, a curator’s risk logic has to live in one of two places. Onchain, where it’s verifiable, but constrained by what a smart contract can express. Offchain, where it can express anything, but nobody outside the curator can confirm it’s enforced.",
  closer:
    "Newton lets a curator condition any vault operation on any policy, referencing onchain or offchain data at evaluation, with every result attested onchain so anyone can verify it independently.",
  cards: [
    {
      iconUrl: "/assets/icons/seal-check.svg",
      title: "Verifiable Policy Enforcement",
      description: [
        "Policies are evaluated by Newton’s operator network, not by the curator or the platform. Each evaluation produces an onchain attestation. An LP or auditor can confirm what was enforced without asking Newton or the curator for anything. Policy versions are new onchain artifacts rather than overwrites, so the history of what was in force is permanent, and any changes are public.",
        "Every curator gets a transparency dashboard to share with LPs. It shows the policies in force and each enforcement decision against vault operations as they settle.",
      ],
    },
    {
      iconUrl: "/assets/icons/package.svg",
      title: "Growing Policy library",
      description:
        "A library of off-the-shelf policies draws on a growing variety of data providers across security, compliance, and market risk. Curators compose these into a stack, extend them in Rego, or write their own. Where a data provider can return a pass or fail signal, sensitive data never leaves their systems. Where the policy requires the underlying data to resolve, evaluation happens inside a TEE, so operators resolve the policy without seeing the input.",
    },
    {
      iconUrl: "/assets/icons/broadcast.svg",
      title: "Policies that update and travel",
      description:
        "Update a policy and every vault referencing it picks up the new version. No governance cycle, no redeployment, no new audit. Write a stack once and enforce it across vaults, chains, and platforms.",
    },
  ],
} as const;

export const paths = {
  label: "Newton for Curators",
  headline: "Three integration paths",
  body: "A curator can integrate Newton at the contract level or in front of it – or at the moment a vault is deployed. Policy evaluation completes in under two seconds on each path.",
  cards: [
    {
      iconUrl: "/assets/icons/gear-six.svg",
      eyebrow: "ERC-4626",
      title: "In the vault contract",
      description:
        "Add a lightweight policy client to the vault. Newton evaluates the policy stack before settlement. Works with Morpho Gates and Hooks, Veda’s Hook module, and any ERC-4626 vault.",
    },
    {
      iconUrl: "/assets/icons/shield-check.svg",
      eyebrow: "Newton Shield",
      title: "In front of the wallet",
      description:
        "Deploy Newton Shield and delegate curator control to it. Shield evaluates every instruction before it reaches the vault, so nothing settles unless it passes. Controls already enforced in your wallet, like signer quorum, become independently verifiable rather than something an LP has to take on faith. Policies your wallet cannot express are added in the same step. No change to the vault contract, no redeployment, no new audit, which makes this the path for vaults that are already live.",
    },
    {
      iconUrl: "/assets/icons/flask.svg",
      eyebrow: "At launch",
      title: "A new vault",
      description:
        "Deploy through Newton’s vault platform, and Shield is integrated from the start. At launch, works with Fordefi MPC wallets, Veda vaults, and Morpho markets.",
    },
  ],
  why: {
    title: "Why it matters",
    description:
      "Curators using Newton offer verifiable enforcement that manual monitoring cannot match. Allocators reviewing vaults get a live view of your policies and can verify enforcement themselves, which shortens diligence time and means more allocator capital flows into your vaults.",
  },
  about:
    "Newton Protocol is built by Newton Labs, formerly Magic Labs, whose wallet infrastructure served 53M+ accounts across consumer and institutional applications (including Polymarket) before its acquisition by Payward (Kraken’s parent company).",
  links: [
    { label: "Docs", href: "https://docs.newton.xyz" },
    { label: "Explorer", href: "https://explorer.newton.xyz" },
    { label: "Demo", href: "https://vaultkit.newton.xyz" },
  ],
} as const;
